<script setup>
const form = ref({
  name: "",
  email: "",
  password: "",
});

async function register() {
  console.log(form.value);
  await useFetch("/api/register", {
    method: "POST",
    body: form.value,
  });
}
</script>
<template>
  <div class="pt-60 flex flex-col mx-80 space-y-10">
    <h1 class="text-4xl text-center text-white">Register</h1>
    <form @submit.prevent="register" class="flex flex-col space-y-6">
      <input
        class="p-2 rounded-md text-white bg-[#34495E]"
        type="text"
        v-model="form.name"
        placeholder="Name"
      />
      <input
        class="p-2 rounded-md text-white bg-[#34495E]"
        type="text"
        v-model="form.email"
        placeholder="Email"
      />
      <input
        class="p-2 rounded-md text-white bg-[#34495E]"
        type="password"
        v-model="form.password"
        placeholder="Password"
      />
      <button
        class="p-2 w-max mx-auto px-4 rounded-md text-white bg-[#34495E]"
        type="submit"
      >
        Register
      </button>
    </form>
  </div>
</template>
