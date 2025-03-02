<template>
  <div>
    <h2>Reset Password</h2>
    <form @submit.prevent="handleSubmit">
      <label for="newPassword">New Password:</label>
      <input type="password" id="newPassword" v-model="newPassword" required />
      <label for="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        v-model="confirmPassword"
        required
      />
      />
      <button type="submit">Reset Password</button>
    </form>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useRoute } from 'vue-router'

const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const route = useRoute()
const token = route.query.token

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    message.value = 'Passwords do not match.'
    return
  }
  try {
    const response = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token,
        newPassword: newPassword.value,
      },
    })
    message.value = response.data.message
  } catch (error) {
    message.value = error.response?.data?.message || 'An error occurred.'
    console.error(error.response?.data?.error || error)
  }
}
</script>
