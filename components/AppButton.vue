<script setup>
import { computed } from 'vue'

const model = defineModel({
  default: false // Для управления состоянием isSubmitting
})

const props = defineProps({
  as: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'nuxt-link'].includes(value)
  },
  to: {
    type: String,
    default: '',
    validator: (value) => typeof value === 'string' // Проверка типа
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => [
  'app-button',
  `app-button--${props.variant}`,
  {
    'app-button--disabled': props.disabled || model.value,
    'app-button--loading': model.value
  }
])
</script>

<template>
  <component
    :is="as === 'nuxt-link' ? NuxtLink : 'button'"
    :type="type"
    :disabled="disabled || model"
    :class="buttonClasses"
    @click="emit('click', $event)"
  >
    <span v-if="model" class="app-button__loader"/>
    <span class="app-button__content">
      <slot/>
    </span>
  </component>
  <component 
    :is="as === 'nuxt-link' ? NuxtLink : 'button'"
    :to="typeof to === 'string' ? to : ''"
    :type="type"
    :disabled="disabled || model"
    :class="buttonClasses"
  >
  <NuxtLink to="/posts" class="btn btn-white btn-animate">Посмотреть все посты</NuxtLink>
  </component>
</template>

<style scoped>
.app-button {
  position: relative;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  border: none;
  outline: none;
}

/* White variant (NuxtLink style) */
.app-button--white {
  background-color: #fff;
  color: #777;
  border: 1px solid currentColor;
  text-transform: uppercase;
  padding: 15px 40px;
  border-radius: 100px;
  position: relative;
  overflow: hidden;
}

.app-button--white::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: #fff;
  z-index: -1;
  border-radius: inherit;
  transition: all 0.4s;
}

.app-button--white:hover:not(.app-button--disabled)::after {
  transform: scale(1.5);
  opacity: 0;
}

/* Primary variant (Submit button style) */
.app-button--primary {
  width: 100%;
  padding: 14px;
  background: #42b983;
  color: white;
  border-radius: 8px;
}

.app-button--primary:hover:not(.app-button--disabled) {
  background: #3aa876;
  transform: translateY(-2px);
}

/* States */
.app-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-button__loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.app-button--loading .app-button__content {
  opacity: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>