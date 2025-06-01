<script setup>
//вывод информации//
const title = ref("");
const content = ref("");
const errorMessage = ref("");
const route = useRoute();
const api = useFetchApi();
const { data: post, status } = await useAsyncData(
  `post-${route.params.id}`,
  () => api(`posts/${route.params.id}`),
);
watch(
  post,
  (newPost) => {
    if (newPost) {
      title.value = newPost.title;
      content.value = newPost.content;
    }
  },
  { immediate: true },
);

const redactPost = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    errorMessage.value = "Поле не может быть пустым!";
    return;
  }
  try {
    await api(`/posts/${route.params.id}`, {
      method: "PUT",
      body: {
        title: title.value,
        content: content.value,
      },
    });
    navigateTo("/posts");
  } catch (error) {
    errorMessage.value = "Ошибка при сохранении";
    console.error(error);
  }
};
</script>
<template>
  <div v-if="status == 'success'">
    <form class="post-form" @submit.prevent="redactPost">
      <h2 class="form-title">Изменить пост</h2>

      <div class="form-group">
        <AppInput v-model="title" label="Заголовок" placeholder="О чем будет пост?" maxLength="100"
         />

      </div>

      <div class="form-group">
        <AppInput v-model="content" maxLength="2000" label="Содержание" placeholder="Расскажите подробнее..." />
        
      </div>

      <AppButton
        size="large"
        >
        Опубликовать
      </AppButton>
      <NuxtLink to="/posts" class="back-link">Отмена</NuxtLink>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </form>
  </div>
  <div v-else>Загрузка...</div>
</template>
<style>
.link-div {
  display: flex;
  justify-content: space-around;
  width: 50%;
}

.but {
  background: none;
  border: none;
}
</style>


