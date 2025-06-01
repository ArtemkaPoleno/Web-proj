<script setup>
const api = useFetchApi();
const { data: posts, status } = await useAsyncData("posts", () =>
  api("/posts?_limit=3"),
);
</script>
<template>
  <div>
    <h1>Недавние записи</h1>
    <div v-if="status == 'success'" class="post-grid">
      <div v-for="post in posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </div>
    </div>
    <div v-else>Загрузка...</div>
    <div class="text-box">
      <AppButton
          as="nuxt-link"
          to="/posts"
          variant="white"
          size="large"
        >
        Все посты
        </AppButton>
    </div>
  </div>
</template>
<style lang="scss">
body {
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  padding-left: 192px;
  padding-right: 192px;
  font-family: "Roboto";
  height: 100%;
}
.content_main {
  display: flex;
  align-items: center;
}
.post-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}
.text-box {
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>
