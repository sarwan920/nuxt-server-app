<script setup>
const form = ref({
  name: "",
  email: "",
});

async function createUser() {
  console.log(form.value);
  await useFetch("/api/hello", {
    method: "POST",
    body: form.value,
  });
}
</script>
<template>
  <div class="pt-60 flex flex-col mx-80 space-y-10">
    <h1 class="text-4xl text-center text-white">Login</h1>
    <input
      class="p-2 rounded-md text-white bg-[#34495E]"
      type="text"
      v-model="form.name"
    />
    <input
      class="p-2 rounded-md text-white bg-[#34495E]"
      type="text"
      v-model="form.email"
    />
    <button
      class="p-2 w-max mx-auto px-4 rounded-md text-white bg-[#34495E]"
      @click="createUser"
    >
      Create User
    </button>
  </div>
</template>
