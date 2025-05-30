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
      <NuxtLink to="/posts" class="btn btn-white btn-animate">Посмотреть все посты</NuxtLink>
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
.btn {
  border: 1px solid;
}
.btn:link,
.btn:visited {
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 40px;
  display: inline-block;
  border-radius: 100px;
  transition: all 0.2s;
  position: absolute;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn-white {
  background-color: #fff;
  color: #777;
}

.btn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}

.btn-white::after {
  background-color: #fff;
}

.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

.btn-animated {
  animation: moveInBottom 5s ease-out;
  animation-fill-mode: backwards;
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
