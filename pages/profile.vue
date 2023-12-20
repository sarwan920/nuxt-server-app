<script setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div
    class="flex bg-red-500 dark:bg-purple-300 flex-col justify-center items-center"
  >
    <p>{{ userStore.user?.name }}</p>
    <UAvatar size="lg" :src="userStore.user?.url" :alt="userStore.user?.name" />
  </div>
</template>
