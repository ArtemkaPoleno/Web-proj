export const useFetchApi = () => {
  const runtimeConfig = useRuntimeConfig(); // Доступ к env-переменным
  const baseURL = runtimeConfig.public.apiBase || 'http://localhost:3001'; // Из nuxt.config.ts

  // Общий обработчик запросов
  return $fetch.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
};