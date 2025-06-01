<script setup>
const route = useRoute();
const postId = route.params.id;
const api = useFetchApi();
const { data: post, status } = await useAsyncData(`post-${postId}`, () =>
  api(`posts/${postId}`),
);

const { data: comments, refresh } = await useAsyncData(
  `comments-${route.params.id}`,
  () => api(`/comments?postId=${route.params.id}`),
);
//создание комментария//
const newComment = reactive({
  postId: postId,
  author: "",
  text: "",
  createdAt: new Date().toISOString(),
});
const errorMessage = ref("");
const addComment = async () => {
  if (!newComment.text.trim() || !newComment.author.trim()) {
    errorMessage.value = "Поле не может быть пустым!";
  } else {
    await api("/comments", {
      method: "POST",
      body: newComment,
    });
    newComment.text = "";
    newComment.author = "";
    refresh();
  }
};
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};
</script>
<template>
  <div class="app-container">
    <div class="content_post">
      <div class="post-page post">
        <h1>{{ post.title }}</h1>
        <div class="post-content big">
          <p style="line-clamp: 10; -webkit-line-clamp: 10">
            {{ post.content }}
          </p>
        </div>
        <div class="back-link-div">
          <NuxtLink to="/posts" class="back-link">- К списку постов</NuxtLink>
          <NuxtLink :to="`/redact/${post.id}`" class="back-link"
            >Отредакировать пост -</NuxtLink
          >
        </div>
      </div>
      <div>
        <form class="post-form" @submit.prevent="addComment">
          <h2 class="form-title">Оставить комментарий</h2>

          <div class="form-group">
            <AppInput v-model="newComment.author" label="Имя пользователя" maxLength="30" placeholder="Ваше имя?" />
          </div>

          <div class="form-group">
            <AppInput v-model="newComment.text" maxLength="300" label="Содержание" placeholder="Расскажите подробнее..." />
            
            <AppButton
              size="large"
              >
              Отправить
            </AppButton>
          </div>

          <NuxtLink to="/posts" class="back-link">Отмена</NuxtLink>
          <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
        </form>

        <div class="post-page post">
          <h1>Комментарии</h1>
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="post-content post"
          >
            <p>
              <strong>{{ comment.author }}</strong>
            </p>
            <p>{{ comment.text }}</p>
            <small>{{ formatDate(comment.createdAt) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="scss">
.btn-sub {
  width: 50%;
  border: 1px solid;
  background: none;
  border-radius: 100px;
  height: 60px;
}
.name {
  border: 1px solid #cacaca;

  width: 30%;
  border-radius: 30px;
  height: 50px;
}
.name::placeholder {
  text-align: center;
}
.comm {
  width: 500px;
  height: 300px;
  max-width: 800px;
  max-height: 300px;
  border: 1px solid #cacaca;
  border-radius: 30px;
}
.comm::placeholder {
  text-align: center;
  font-size: large;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.addcomm {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  height: 500px;
  display: flex;
  flex-direction: column;
}

.back-link-div {
  display: flex;
  justify-content: space-between;
}
.post-page {
  min-height: 600px;
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
<style>
.submit-btn {
  width: 100%;
  padding: 14px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
}

.submit-btn:hover:not(:disabled) {
  background: #3aa876;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.post-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
}

.form-input,
.form-textarea {
  width: 90%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.input-counter {
  text-align: right;
  font-size: 0.8rem;
  color: #95a5a6;
  margin-top: 0.25rem;
}
</style>
