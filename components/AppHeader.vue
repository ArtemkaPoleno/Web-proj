<script setup>

</script>
<template>
  <header class="header">
    <div class="header__container">

      <NuxtLink to="/" class="header__logo">
        <img src="~/assets/images/logo.png" alt="Логотип" class="logo-image">
      </NuxtLink>

     
    </div>
  </header>
</template>


<style>
header {
    margin-bottom:20px;
    display:flex;
    justify-content:center;
    align-items:center;
    background: #b6b6b6;
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