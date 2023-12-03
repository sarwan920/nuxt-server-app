<script setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
const form = ref({
  email: "",
  password: "",
});

const registrationResult = ref(null);
const err = ref(false);
const errMessage = ref("");
async function login() {
  try {
    const data = await $fetch("/api/users/login", {
      method: "POST",
      body: form.value,
    });
    err.value = false;
    userStore.isAuthenticated = true;
    userStore.user = data;
    navigateTo("/");
  } catch (error) {
    err.value = true;
    errMessage.value = error.response.statusText;
    console.log(error.response);
  }
}
</script>
<template>
  <div
    class="flex flex-col mx-80 space-y-10 border border-gray-400 rounded-md p-2"
  >
    <h1 class="text-4xl text-center text-black">Login</h1>
    <form @submit.prevent="login" class="flex flex-col space-y-10">
      <p v-show="err" class="text-red-500">{{ errMessage }}</p>
      <input
        class="p-2 rounded-md text-white bg-[#34495E]"
        type="text"
        v-model="form.email"
      />
      <input
        class="p-2 rounded-md text-white bg-[#34495E]"
        type="password"
        autocomplete="on"
        v-model="form.password"
      />
      <button
        type="submit"
        class="p-2 w-max mx-auto px-4 rounded-md text-white bg-[#34495E]"
      >
        Login
      </button>
    </form>
  </div>
</template>
