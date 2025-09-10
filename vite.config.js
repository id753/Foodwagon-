import { defineConfig } from "vite";

export default defineConfig({
  base: "/Foodwagon-/",
  build: {
    rollupOptions: {
      external: ["axios", "izitoast", "swiper", "basiclightbox"],
    },
  },
});
