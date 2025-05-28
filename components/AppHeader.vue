<script setup>

</script>
<template>
  <header class="header">
    <div class="header__container">
      <div class="text-box"><NuxtLink to="/posts" class="btn btn-white btn-animate">Посты</NuxtLink></div>
      <NuxtLink to="/" class="header__logo">
        <img src="~/assets/images/logo.svg" alt="Логотип" class="logo-image">
      </NuxtLink>
      <div class="text-box"><NuxtLink to="/create" class="btn btn-white btn-animate">Создать пост</NuxtLink></div>
     
    </div>
  </header>
</template>


<style>
.header__container {
    margin-bottom:20px;
    display:flex;
    
    justify-content:space-between;
    align-items:center;
    background: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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