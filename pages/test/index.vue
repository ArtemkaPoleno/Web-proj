<script setup>
const title = defineModel('title', { default: '' })
const content = defineModel('content', { default: '' })
const error = ref('')
const isSubmitting = ref(false)

const emit = defineEmits(['submit'])

const handleSubmit = async () => {
  if (!title.value.trim()) {
    error.value = 'Заголовок не может быть пустым'
    return
  }
  if (!content.value.trim()) {
    error.value = 'Содержание не может быть пустым'
    return
  }

  isSubmitting.value = true
  try {
    await emit('submit')
    title.value = ''
    content.value = ''
    error.value = ''
  } catch (error) {
    error.value = 'Ошибка при создании поста'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="post-form" @submit.prevent="handleSubmit" >
    <h2 class="form-title">Новый пост</h2>
    
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
        {{ error }}
      </div>
    </Transition>

    <button
      type="submit"
      class="submit-btn"
      :disabled="isSubmitting"
    >
      <span v-if="isSubmitting" class="spinner"/>
      <span v-else>Опубликовать</span>
    </button>
  </form>
</template>

<style scoped>
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
  width:90%;
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
}
</style>