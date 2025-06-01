<script setup>
// Импортируем необходимые функции из Vue
import { computed } from 'vue'

// Определяем входные параметры (props)
const props = defineProps({
  // Тип элемента: button или nuxt-link
  as: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'nuxt-link'].includes(value)
  },
  
  // Путь для nuxt-link
  to: {
    type: String,
    default: ''
  },
  
  // Тип кнопки (button/submit/reset)
  type: {
    type: String,
    default: 'button'
  },
  
  // Вариант стиля
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'white'].includes(value)
  },
  
  // Размер кнопки
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  
  // Состояние disabled
  disabled: {
    type: Boolean,
    default: false
  },
  
  // Состояние загрузки
  loading: {
    type: Boolean,
    default: false
  }
})

// Определяем события, которые может генерировать компонент
const emit = defineEmits(['click'])

// Вычисляемые классы для кнопки
const buttonClasses = computed(() => [
  'app-button',
  `app-button--${props.variant}`,
  `app-button--${props.size}`,
  {
    'app-button--disabled': props.disabled || props.loading,
    'app-button--loading': props.loading
  }
])
</script>

<template>
  <!-- Динамический компонент (button или NuxtLink) -->
  <component
    :is="as === 'nuxt-link' ? NuxtLink : 'button'"
    :to="to"
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="emit('click', $event)"
  >
    <!-- Индикатор загрузки -->
    <span v-if="loading" class="app-button__loader"></span>
    
    <!-- Содержимое кнопки -->
    <span class="app-button__content">
      <slot></slot>
    </span>
  </component>
</template>