<script setup>
const form = ref({
  name: "",
  email: "",
  password: "",
});

definePageMeta({
  middleware: "un-auth",
});

// const { files,open, } = useFileDialog();

const err = ref(false);
const errMessage = ref("");
const file = ref(null);
const loading = ref(false);
async function onChange(event) {
  const target = event.target;
  if (target && target.files) {
    file.value = target.files[0];
  }
}

async function uploadPhoto() {
  let formData = new FormData();
  formData.append(form.value.name, file.value);

  try {
    const data = await $fetch("/api/file", {
      method: "POST",
      body: formData,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function register() {
  loading.value = true;
  try {
    const data = await $fetch("/api/users/register", {
      method: "POST",
      body: form.value,
    });
    if (data) {
      await uploadPhoto();
    }
    err.value = false;
    loading.value = false;
    navigateTo("/login");
  } catch (error) {
    loading.value = false;
    err.value = true;
    errMessage.value = error.response.statusText;
    console.log(error.response);
  }
}
</script>
<template>
  <Card>
    <h2 class="text-center">Register Your Account</h2>
    <form @submit.prevent="register" class="flex flex-col space-y-10">
      <p v-show="err" class="text-red-500">{{ errMessage }}</p>
      <UInput type="text" v-model="form.name" placeholder="Name" />
      <UInput type="text" v-model="form.email" placeholder="Email" />
      <UInput
        type="password"
        autocomplete="on"
        v-model="form.password"
        placeholder="Password"
      />
      <UInput type="file" @change="onChange($event)" />
      <UButton
        type="submit"
        :loading="loading"
        class="p-2 w-max mx-auto px-4 rounded-md"
      >
        Register
      </UButton>
    </form>
  </Card>
</template>
