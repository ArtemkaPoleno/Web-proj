<script setup>
const route = useRoute();
const postId = Number(route.params.id);
const { data: post } = await useAsyncData(`post-${route.params.id}`
, () => 
  $fetch(`http://localhost:3001/posts/${route.params.id}`)
);

const { data: comments, refresh } = await useAsyncData(`comments-${route.params.id}`
, () => 
  $fetch(`http://localhost:3001/comments?postId=${route.params.id}`)
);
//создание комментария//
const newComment = reactive({
  postId: postId,
  author: '',
  text: '',
  createdAt: new Date().toISOString()
})
const addComment = async () => {
  if (!newComment.text.trim() ||!newComment.author.trim() ) {
    errorMessage.value = 'Поле не может быть пустым!'
  }else{
  await $fetch('http://localhost:3001/comments', {
    method: 'POST',
    body: newComment
  });
  newComment.text = ''
  newComment.author = ''
  refresh()
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
    <div class="post-content big">
      <p style="-webkit-line-clamp: 10;">{{ post.content }}</p>
    </div>
    <div class="back-link-div">
    <NuxtLink to="/posts" class="back-link">- К списку постов</NuxtLink>
    <NuxtLink :to="`/redact/${post.id}`" class="back-link">Отредакировать пост -</NuxtLink></div>
  </div>
  <div >
    <div class="addcomm post-page">
      <form @submit.prevent="addComment">
    <h2>Оставить комментарий</h2> 
     <div class="form"> 
     <input class="inp  name" v-model="newComment.author" placeholder="Ваше имя">
     <textarea class="comm" v-model="newComment.text" placeholder="Напишите что-нибудь" ></textarea> 
    <button type="submit"class="btn btn-sub btn-white btn-animate">Опубликовать</button>
    <p style="color:red;" v-if="errorMessage">{{ errorMessage }}</p></div>

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
.btn-sub{
  width: 50%;
  border: 1px solid;
  background: none;
  border-radius: 100px;
  height: 60px;
}
.name{
border: 1px solid #cacaca;
  
  width: 30%;
  border-radius: 30px;
  height: 50px;
}
.name::placeholder{

 text-align: center;

}
.comm{
width: 500px;
height: 300px;
max-width: 800px;
max-height: 300px;
border: 1px solid #cacaca;
  border-radius: 30px;
}
.comm::placeholder{
  text-align: center;
  font-size: large;
}
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

}
.addcomm{
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  height: 250px;
  display: flex;
  flex-direction: column;

}
   
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