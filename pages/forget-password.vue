<script setup>
const state = reactive({
  email: undefined,
})
const toast = useToast()

async function sendPasswordResetEmail() {
  try {
    const data = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: state,
    })
    console.log(data)
    if (data?.data) {
      toast.add({
        title: 'Email has been send Successfully!',
        icon: 'i-heroicons-check-badge',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <Card>
    <div class="space-y-5">
      <h1 class="text-center">Forget Password</h1>
      <UForm class="space-y-4" :state="state" @submit="sendPasswordResetEmail">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UButton type="submit">Submit</UButton>
      </UForm>
    </div>
  </Card>
</template>
