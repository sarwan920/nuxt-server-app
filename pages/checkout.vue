<script setup>
const stripe = await useClientStripe();
function continuePayment() {
  stripe
}
</script>
<template>
  <div>
    <h1>Checkout nuxt Stripe</h1>
    <div>
      {{ stripe ? stripe : "NONE" }}
    </div>
    <button @click="continuePayment">Continue</button>
  </div>
</template>
