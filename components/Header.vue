<script setup>
// const colorMode = useColorMode();

// const isDark = computed({
//   get() {
//     return colorMode.value === "dark";
//   },
//   set() {
//     colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
//   },
// });
const userStore = useUserStore();
function logout() {
  userStore.user = null;
  userStore.isAuthenticated = false;
  navigateTo("/login");
}
</script>

<template>
  <UContainer class="sticky">
    <header
      class="max-w-full flex sticky backdrop-blur-xl top-0 h-16 align-middle"
    >
      <!-- <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        variant="ghost"
        aria-label="Theme"
        class="my-auto"
        @click="isDark = !isDark"
      /> -->

      <div class="flex flex-row mx-auto justify-center gap-6 my-auto">
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
        <NuxtLink v-show="!userStore.isAuthenticated" to="/login"
          >Login</NuxtLink
        >
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
  </UContainer>
</template>
