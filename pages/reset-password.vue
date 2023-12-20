<script setup>
const route = useRoute();
const token = route.query.token;

if (!token) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found!",
  });
}
</script>
<template>
  <Card>
    <div class="space-y-4">
      <h2 class="text-center">Reset Your Password {{ route.query.token }}</h2>
    </div>
  </Card>
</template>
