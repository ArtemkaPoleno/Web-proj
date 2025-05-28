<script setup>
const title = ref('');
const content = ref('');
const errorMessage = ref('')

const createPost = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    errorMessage.value = 'Поле не может быть пустым!'
  }else{
  await $fetch('http://localhost:3001/posts', {
    method: 'POST',
    body: { 
      title: title.value,
      content: content.value 
    }
  });
  navigateTo('/posts');
}
  
};
</script>
<template>
  <AppHeader />
  <NuxtPage />
  <div class="crt">
    <h1>Создать пост
    </h1>
    <input class="inp title" v-model="title" placeholder="Заголовок">
    <textarea class="inp text"type="text" v-model="content" placeholder="Текст"></textarea>
   
    <button class="btn btn-white btn-animate create-btn" @click="createPost">Опубликовать</button>
<NuxtLink to="/posts" class="back-link" >Отмена</NuxtLink> <p style="color:red;" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style>
.inp{
  border: 1px solid #cacaca;
  width: 30%;
  border-radius: 30px;
  height: 50px;
} 
input::placeholder{
  padding-left: 42%;
}
textarea::placeholder{
  position: absolute;
  top: 50%;
  left: 45%;
}
.text{
  height: 500px;  
}
.crt{
  min-height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
   border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease;
  height: 250px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.create-btn{
  width: 30%;
  border-radius: 30px;
  height: 80px;
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

</style>