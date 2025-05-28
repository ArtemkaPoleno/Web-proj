<script setup>
//вывод информации//
const title = ref('');
const content = ref('');
const errorMessage = ref('')
const route = useRoute()
const { data: post, pending } = await useAsyncData(`post-${route.params.id}`, () => 
  $fetch(`http://localhost:3001/posts/${route.params.id}`)
  
);
watch(post, (newPost) => {
  if (newPost) {
    title.value = newPost.title;
    content.value = newPost.content;
  }
}, { immediate: true });

const redactPost = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    errorMessage.value = 'Поле не может быть пустым!';
    return;
  }
  try{
    await $fetch(`http://localhost:3001/posts/${route.params.id}`, {
    method: 'PUT',
    body: { 
      title: title.value,
      content: content.value, 
    }
  });
  navigateTo('/posts');
  } catch(error){
    errorMessage.value = 'Ошибка при сохранении';
    console.error(error);
  }
  
};






</script>
<template>
  
 <AppHeader/>
  <NuxtPage/>
  <div v-if="pending">
    Загрузка...
  </div>
  
  <div class="crt" v-else>
    <input class="inp title" type="text" v-model="title" >
    <textarea class="inp text" v-model="content" ></textarea>
  
    
    <div class="link-div">
    <NuxtLink to="/posts" class="back-link">- К списку постов</NuxtLink>
    <p style="color:red;" v-if="errorMessage">{{ errorMessage }}</p>
  
    <button class="back-link" @click="redactPost">Сохранить</button></div>
  </div>
  <div class="crt">
    <input class="inp title" type="text" v-model="title" >
    <textarea class="inp text" v-model="content" ></textarea>
  
    
    <div class="link-div">
    <NuxtLink to="/posts" class="back-link">- К списку постов</NuxtLink>
    <p style="color:red;" v-if="errorMessage">{{ errorMessage }}</p>
  
    <button class="back-link" @click="redactPost">Сохранить</button></div>
  </div>
</template>
<style>
.link-div{
  display:flex;
  justify-content:space-around;
  width:50%
}

</style>