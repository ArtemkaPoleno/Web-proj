export const useFetchApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.apiBase || "http://localhost:3001";

  return $fetch.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
