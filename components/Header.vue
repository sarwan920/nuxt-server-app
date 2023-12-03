<script setup>
const userStore = useUserStore();
</script>

<template>
  <header class="max-w-full bg-slate-300">
    <div class="flex flex-row mx-auto justify-center gap-6 py-5">
      <NuxtLink v-show="userStore.isAuthenticated" to="/">Dashboard</NuxtLink>
      <NuxtLink v-show="!userStore.isAuthenticated" to="/login">Login</NuxtLink>
      <NuxtLink v-show="!userStore.isAuthenticated" to="/register"
        >Register</NuxtLink
      >
    </div>
  </header>
</template>
