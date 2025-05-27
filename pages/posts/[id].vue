
<template>
  <div v-if="pending">
    Загрузка...
  </div>
  <div v-else>
    <div class="post-page">
    <h1>{{ post.title }}</h1>
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <NuxtLink to="/posts" class="back-link">← К списку постов</NuxtLink>
  </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: post, pending } = await useAsyncData(`post-${route.params.id}`, () => 
  $fetch(`http://localhost:3001/posts/${route.params.id}`)
)
</script>


<style lang="scss">
.post-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;

  .post-content {
    margin-top: 30px;
    line-height: 1.6;
    font-size: 1.1rem;
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