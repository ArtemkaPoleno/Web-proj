<script setup>
const title = ref("");
const content = ref("");
const errorMessage = ref("");
const api = useFetchApi();
const createPost = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    errorMessage.value = "Поле не может быть пустым!";
  } else {
    await api("/posts", {
      method: "POST",
      body: {
        title: title.value,
        content: content.value,
      },
    });
    navigateTo("/posts");
  }
};
</script>
<template>
  <form class="post-form" @submit.prevent="createPost">
    <h2 class="form-title">Создать пост</h2>

    <div class="form-group">
      <AppInput v-model="title" label="Заголовок" placeholder="О чем будет пост?" maxLength="100"
         />
    </div>

    <div class="form-group">
      <AppInput v-model="content" maxLength="2000" label="Содержание" placeholder="Расскажите подробнее..." />
        
    </div>

    <Transition name="fade">
      <div v-if="error" class="error-message">
        {{ errorMessage }}
      </div>
    </Transition>

    <AppButton
      variant="primary"
      size="large"
      >
      Отправить
    </AppButton>
    <NuxtLink to="/posts" class="back-link">Отмена</NuxtLink>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </form>
</template>

<style>
.inp {
  border: 1px solid #cacaca;
  width: 30%;
  border-radius: 30px;
  height: 50px;
}
input::placeholder {
  text-align: center;
}
textarea::placeholder {
  text-align: center;
}
.text {
  height: 500px;
}
.crt {
  min-height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  height: 250px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.create-btn {
  width: 30%;
  border-radius: 30px;
  height: 80px;
  text-transform: uppercase;
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
