<script setup>
import { computed } from 'vue'

// Безопасное определение пропсов
const props = defineProps({
  as: {
    type: String,
    default: 'button',
    validator: (val) => ['button', 'nuxt-link',].includes(String(val))
  },
  to: {
    type: [String, Object],
    default: '',
    validator: (val) => {
      if (typeof val === 'string') return true
      return val && typeof val === 'object'
    }
  },
  type: {
    type: String,
    default: 'submit'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'medium'
  }
})

const emit = defineEmits(['click'])

// Защищенное вычисление классов
const buttonClasses = computed(() => {
  const variant = String(props.variant)
  const size = String(props.size)
  
  return [
    'app-button',
    `app-button--${variant}`,
    `app-button--${size}`,
    {
      'app-button--disabled': props.disabled || props.loading,
      'app-button--loading': props.loading
    }
  ]
})
</script>

<template>
  <!-- Безопасный рендеринг компонента -->
  <template v-if="as === 'nuxt-link' && to">
    <NuxtLink
      :to="to"
      :class="buttonClasses"
    >
      <slot />
    </NuxtLink>
  </template>
  <button
    v-else
    :type="type"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>


<style scoped lang="scss">
.app-button {
  /* Базовые стили */
  position: relative;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  border-radius: 100px;
  font-family: inherit;
  border: none;
  outline: none;

  /* Вариант white (кнопка-ссылка) */
  &--white {
    background-color: #fff;
    color: #777;
    border: 1px solid currentColor;
    text-transform: uppercase;
    padding: 15px 40px;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background-color: #fff;
      z-index: -1;
      border-radius: inherit;
      transition: all 0.4s;
    }

    &:hover{
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    }
  }

  /* Вариант primary (зеленая кнопка) */
  &--primary {
    margin-top: 30px;
    width: 100%;
    padding: 14px;
    background: #42b983;
    color: white;
    border-radius: 8px;

    &:hover:not(.app-button--disabled) {
      background: #3aa876;
      transform: translateY(-2px);
    }
  }


  &--medium {
    font-size: 14px;
    padding: 12px 24px;
  }

  &--large {
    font-size: 16px;
    padding: 16px 32px;
  }

  /* Состояния */
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--loading .app-button__content {
    opacity: 0;
  }

  /* Элементы кнопки */
  &__loader {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.3s linear infinite;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.3s;
  }
}

/* Анимация загрузки */
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>