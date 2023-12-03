<script setup>
const form = ref({
  name: "",
  email: "",
  password: "",
});

const registrationResult = ref(null);

async function register() {
  try {
    const data = await $fetch("/api/users/register", {
      method: "POST",
      body: form.value,
    });
    console.log(data);
    registrationResult.value = data;
  } catch (error) {
    console.log(error.message);
  }
}
</script>
<template>
  <div class="pt-60 flex flex-col mx-80 space-y-10">
    <h1 class="text-center text-white">Register {{ registrationResult }}</h1>
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
