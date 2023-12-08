<script setup>
const userStore = useUserStore();
function logout() {
  userStore.user = null;
  userStore.isAuthenticated = false;
  navigateTo("/login");
}
</script>

<template>
  <header class="max-w-full bg-slate-300 flex">
    <div class="flex flex-row mx-auto justify-center gap-6 py-5">
      <NuxtLink
        v-show="userStore.isAuthenticated"
        class="hover:font-bold hover:text-gray-600 transition-all"
        to="/"
        >Dashboard</NuxtLink
      >
      <NuxtLink
        v-show="userStore.isAuthenticated"
        class="hover:font-bold hover:text-gray-600 transition-all"
        to="/profile"
        >Profile</NuxtLink
      >
      <NuxtLink v-show="!userStore.isAuthenticated" to="/login">Login</NuxtLink>
      <NuxtLink v-show="!userStore.isAuthenticated" to="/register"
        >Register</NuxtLink
      >
    </div>
    <button
      v-show="userStore.isAuthenticated"
      class="my-auto mr-4 hover:font-bold hover:text-gray-600 transition-all"
      @click="logout"
    >
      Logout
    </button>
  </header>
</template>
