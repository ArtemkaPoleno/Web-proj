<script setup>
const route = useRoute()
const errorMessage = ref('')

// Явно преобразуем ID в число
const postId = computed(() => Number(route.params.id))

// Загрузка поста
const { data: post } = await useAsyncData(`post-${postId.value}`, () => 
  $fetch(`http://localhost:3001/posts/${postId.value}`)
)

// Загрузка комментариев
const { data: comments, refresh } = await useAsyncData(`comments-${postId.value}`, () => 
  $fetch(`http://localhost:3001/comments?postId=${postId.value}`)
)

// Форма комментария
const newComment = reactive({
  postId: postId.value, // Используем computed значение
  author: '',
  text: '',
  createdAt: new Date().toISOString()
})

// Создание комментария
const addComment = async () => {
  if (!newComment.text.trim() || !newComment.author.trim()) {
    errorMessage.value = 'Заполните все поля!'
    return
  }

  try {
    // Проверяем данные перед отправкой
    console.log('Отправляемые данные:', JSON.stringify({
      ...newComment,
      postId: postId.value
    }))

    await $fetch('http://localhost:3001/comments', {
      method: 'POST',
      body: {
        ...newComment,
        postId: postId.value // Явно передаём актуальное значение
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Сброс формы
    newComment.text = ''
    newComment.author = ''
    errorMessage.value = ''
    refresh() // Обновляем список комментариев
    
  } catch (error) {
    errorMessage.value = 'Ошибка при отправке комментария'
    console.error('Ошибка:', error)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}
</script>
<template>
  <div>
 <AppHeader/>
  <NuxtPage/></div>
<div class="content_post">
    <div class="post-page post">
    <h1>{{ post.title }}</h1>
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <div class="back-link-div">
    <NuxtLink to="/posts" class="back-link">- К списку постов</NuxtLink>
    <NuxtLink :to="`/redact/${post.id}`" class="back-link">Отредакировать пост -</NuxtLink></div>
  </div>
  <div >
    <div class="addcomm post-page post">
      <form @submit.prevent="addComment">
    <h2>Оставить комментарий</h2>  
     <input v-model="newComment.author" placeholder="Ваше имя">
     <textarea v-model="newComment.text" placeholder="Напишите что-нибудь" ></textarea> 
    <button type="submit"class="btn btn-white btn-animate">Опубликовать</button>
    <p style="color:red;" v-if="errorMessage">{{ errorMessage }}</p>

    </form>
    </div>
    <div class="post-page post">
    <h1>Комментарии</h1>
    
    <div class="post-content post" v-for="comment in comments" :key="comment.id">
      <p><strong>{{ comment.author }}</strong></p>
        <p>{{ comment.text }}</p>
        <small>{{ formatDate(comment.createdAt) }}</small>
    </div>
    
  </div>
</div></div>  
  
</template>



<style lang="scss">


.back-link-div{
  display: flex;
  justify-content: space-between;
}
.post-page {
  min-height: 600px ;
 overflow-y: auto;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  
  .post-content {
    margin-top: 30px;
    line-height: 1.6;
    font-size: 1.1rem;
    min-height: 250px;
  }

  .back-link {
    display: inline-block;
    margin-top: 30px;
    color: #3498db;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

</style>