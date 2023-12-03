<script setup>
const form = ref({
  name: "",
  email: "",
  password: "",
});

const err = ref(false);
const errMessage = ref("");

async function register() {
  try {
    const data = await $fetch("/api/users/register", {
      method: "POST",
      body: form.value,
    });
    err.value = false;
    navigateTo("/login");
  } catch (error) {
    err.value = true;
    errMessage.value = error.response.statusText;
    console.log(error.response);
  }
}
</script>
<template>
  <div class="pt-10">
    <div class="w-3/6 rounded-xl bg-gray-300 p-6 mx-auto">
      <h1 class="text-4xl text-center text-black">Register</h1>
      <form @submit.prevent="register" class="flex flex-col space-y-10">
        <p v-show="err" class="text-red-500">{{ errMessage }}</p>
        <input
          class="p-2 rounded-md text-gray-600 bg-gray-200"
          type="text"
          v-model="form.name"
          placeholder="Name"
        />
        <input
          class="p-2 rounded-md text-gray-600 bg-gray-200"
          type="text"
          v-model="form.email"
          placeholder="Email"
        />
        <input
          class="p-2 rounded-md text-gray-600 bg-gray-200"
          type="password"
          autocomplete="on"
          v-model="form.password"
          placeholder="Password"
        />
        <button
          type="submit"
          class="p-2 w-max mx-auto px-4 rounded-md text-white bg-[#34495E]"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
