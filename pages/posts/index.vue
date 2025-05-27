<script setup>
const { data: posts } = await useAsyncData('posts', () => 
  $fetch('http://localhost:3001/posts')
);
</script>
<template>
  <AppHeader />
  <NuxtPage />
  <div class="posts-page">
    <h1>Все посты </h1>
    <div class="content">
      <div class="post" v-for="post in posts" :key="post.id">
        <NuxtLink :to="`/posts/${post.id}`" class="post-link">
          <h2>{{ post.title }}</h2>
          <div class="post-content">
            <p>{{ post.content }}</p>
          </div>
          <span class="read-more">Читать дальше →</span>
        </NuxtLink>
      </div>
    </div>
    <NuxtLink to="/" class="btn btn-white btn-animate">На главную</NuxtLink>
  </div>
</template>



<style lang="scss">
.posts-page {
  max-width: 1536px;
  margin: 0 auto;
}

.content {
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
  gap: 20px;

}

.post {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease;
  height: 250px; /* Фиксированная высота карточки */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Скрываем текст, выходящий за границы */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
  line-height: 1.4;
  word-wrap: break-word; /* Перенос длинных слов */
  overflow-wrap: break-word; /* Альтернатива для некоторых браузеров */
  word-break: break-word; /* Переносит слишком длинные слова */
  
  /* Ограничение по количеству строк */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-content {
  flex-grow: 1;
  margin-bottom: 30px;
  overflow: hidden;
  
  p {
    color: #7f8c8d;
    margin: 0;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    text-overflow: ellipsis;
    
    /* Ограничение по количеству строк */
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.read-more {
  color: #3498db;
  font-size: 0.9rem;
  align-self: flex-end;
  margin-top: auto;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }
}

/* Добавляем градиент для плавного обрезания текста */
.post-content {
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    
  }
}
</style>