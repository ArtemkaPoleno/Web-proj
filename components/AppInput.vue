<script setup>
import { computed } from 'vue'

// Определяем модель для двустороннего связывания
const model = defineModel({
  type: [String, Number],
  default: ''
})

// Пропсы компонента
const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (val) => ['text', 'maintext'].includes(val)
  },
  variant:{
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  maxLength: {
    type: String,
    default: null
  }
})

// Вычисляемые классы
const inputClasses = computed(() => {
    const variant = String(props.variant)
    return[
        'app-input',
        `app-input--${variant}`
    ]
})
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
      :class="inputClasses"
    />
    <div v-if="maxLength" class="character-counter">
      {{ model?.length || 0 }}/{{ maxLength }}
    </div>
    <div v-if="error && errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
    
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.input-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.app-input {
  width: 90%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: white;
  
}

.character-counter {
  font-size: 12px;
  color: #999;
  text-align: right;
}

.error-message {
  color: #ff4d4f;
  font-size: 13px;
  margin-top: 4px;
}

</style>