import { defineConfig } from "vite";

export default defineConfig({
  // Базовый публичный путь для продакшн-окружения
  // Замените 'your-repository-name' на имя вашего репозитория
  base: "/Foodwagon-/",
  plugins: [],
  build: {
    commonjsOptions: {
      include: ["izitoast"],
    },
  },
});
