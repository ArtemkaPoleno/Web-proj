<script setup>
const api = useFetchApi();
const page = ref(1);
const perPage = 6; // Количество постов на странице

const { data: postsData, status } = await useLazyAsyncData(
  "all-posts",
  async () => {
    const allPosts = await api("/posts");
    // Сортируем посты по ID (если нужно)
    const sortedPosts = [...allPosts].sort((a, b) => b.id - a.id);
    
    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(sortedPosts.length / perPage);
    
    // Получаем посты для текущей страницы
    const paginatedPosts = sortedPosts.slice(
      (page.value - 1) * perPage,
      page.value * perPage
    );
    
    return {
      posts: paginatedPosts,
      total: sortedPosts.length,
      totalPages
    };
  },
  {
    watch: [page] // Перезагружаем данные при изменении страницы
  }
);

// Функции для изменения страницы
const nextPage = () => {
  if (page.value < postsData.value.totalPages) {
    page.value++;
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const goToPage = (num) => {
  page.value = num;
};
</script>

<template>
  <div class="posts-page">
    <h1>Все посты</h1>
    <div v-if="status == 'success'">
      <div class="content">
        <div class="post-grid">
          <div v-for="post in postsData.posts" :key="post.id" class="post">
            <NuxtLink :to="`/posts/${post.id}`" class="post-link">
              <h2>{{ post.title }}</h2>
              <div class="post-content">
                <p>{{ post.content }}</p>
              </div>
              <span class="read-more">Читать дальше →</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Пагинация -->
        <div class="pagination" v-if="postsData.totalPages > 1">
          <button 
            @click="prevPage" 
            :disabled="page === 1"
            class="pagination-button"
          >
            Назад
          </button>
          
          <button
            v-for="n in postsData.totalPages"
            :key="n"
            @click="goToPage(n)"
            :class="{ active: page === n }"
            class="pagination-button"
          >
            {{ n }}
          </button>
          
          <button 
            @click="nextPage" 
            :disabled="page === postsData.totalPages"
            class="pagination-button"
          >
            Вперед
          </button>
        </div>
      </div>
    </div>
    <div v-else>Загрузка...</div>
  </div>
</template>

<style lang="scss">
.posts-page {
  margin: 0 auto;
}

.btn-div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 30px;
}

.post {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease;
  height: 250px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;

  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-content {
  flex-grow: 1;
  margin-bottom: 30px;
  overflow: hidden;

  p {
    color: #7f8c8d;
    margin: 0;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    text-overflow: ellipsis;

    display: -webkit-box;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.read-more {
  color: #3498db;
  font-size: 0.9rem;
  align-self: flex-end;
  margin-top: auto;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }
}

.post-content {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
  }
}

/* Стили для пагинации */
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.pagination-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #f0f0f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
}
</style>