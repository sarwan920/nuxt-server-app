<script setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
const form = ref({
  email: "",
  password: "",
});

definePageMeta({
  middleware: "un-auth",
});

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
  <Card>
    <h2 class="text-center">Login</h2>
    <form @submit.prevent="login" class="flex flex-col space-y-10">
      <p v-show="err" class="text-red-500">{{ errMessage }}</p>
      <div class="space-y-5">
        <UInput type="text" v-model="form.email" placeholder="Email" />
        <UInput
          type="password"
          autocomplete="on"
          v-model="form.password"
          placeholder="Password"
        />
        <ULink
          to="/forget-password"
          active-class="text-primary"
          class="text-sm ml-auto w-full text-right"
        >
          Forgot Your Password?
        </ULink>
      </div>
      <UButton type="submit" class="p-2 w-max mx-auto px-4 rounded-md">
        Login
      </UButton>
    </form>
  </Card>
</template>
