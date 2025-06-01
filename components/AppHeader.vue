<script setup></script>
<template>
  <header class="header">
    <div class="header__container">
      <div class="text-box">
        <AppButton
          as="nuxt-link"
          to="/posts"
          variant="white"
          size="medium"
        >
          Посты
        </AppButton>
      </div>
      <NuxtLink to="/" class="header__logo">
        <img src="~/assets/images/logo.svg" alt="Логотип" class="logo-image" />
      </NuxtLink>
      <div class="text-box">
        <AppButton
          as="nuxt-link"
          to="/create"
          variant="white"
          size="medium"
        >
        Создать пост
        </AppButton>
      </div>
    </div>
  </header>
</template>

<style>
.header__container {
  margin-bottom: 20px;
  display: flex;

  justify-content: space-between;
  align-items: center;
  background: #ffffff;

  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  .logo-image {
    height: 100px;
    width: auto;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05); 
    }
  }
}
</style>
