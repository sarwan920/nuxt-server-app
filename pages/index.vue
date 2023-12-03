<script setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
definePageMeta({
  middleware: "auth",
});

function logout() {
  userStore.user = null;
  userStore.isAuthenticated = false;
  navigateTo("/login");
}
</script>
<template>
  <div>dashboard {{ userStore.user?.name }}</div>
  <button @click="logout">Logout</button>
</template>
