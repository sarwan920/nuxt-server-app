<script setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="">
    <p>{{ userStore.user?.name }}</p>
    <img :src="userStore.user?.url" :alt="userStore.user?.name" />
  </div>
</template>
