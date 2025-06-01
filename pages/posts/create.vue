<script setup>
const title = ref("");
const content = ref("");

const createPost = async () => {
  await $fetch("http://localhost:3001/posts", {
    method: "POST",
    body: {
      title: title.value,
      content: content.value,
    },
  });
  navigateTo("/posts");
};
</script>
<template>
  <div>
    <h1>Создать пост</h1>
    <input v-model="title" placeholder="Заголовок" />
    <textarea v-model="content" placeholder="Текст"></textarea>
    <button @click="createPost">Опубликовать</button>
    <NuxtLink to="/posts">Отмена</NuxtLink>
  </div>
</template>
