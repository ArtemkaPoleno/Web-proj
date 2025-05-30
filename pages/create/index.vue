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


  <form class="post-form" @submit.prevent="createPost" >
    <h2 class="form-title"> Создать пост</h2>
    
    <div class="form-group">
      <label for="post-title" class="input-label">Заголовок</label>
      <input
        id="post-title"
        v-model="title"
        type="text"
        class="form-input"
        placeholder="О чём будет пост?"
        maxlength="100"
      >
      <div class="input-counter">{{ title.length }}/100</div>
    </div>

    <div class="form-group">
      <label for="post-content" class="input-label">Содержание</label>
      <textarea
        id="post-content"
        v-model="content"
        class="form-textarea"
        placeholder="Расскажите подробнее..."
        rows="6"
      />
      <div class="input-counter">{{ content.length }}/2000</div>
    </div>

    <Transition name="fade">
      <div v-if="error" class="error-message">
        {{ errorMessage }}
      </div>
    </Transition>

    <button
      type="submit"
      class="submit-btn"
      :disabled="isSubmitting"
    >
      <span>Опубликовать</span>  
    </button>
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
<style lang="scss" scoped>
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

.error-message {
  color: #ff4757;
  background: #ffecec;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
  animation: shake 0.5s;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}</style>
