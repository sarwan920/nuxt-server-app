<script setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
definePageMeta({
  middleware: "auth",
});

const text = ref("");

async function addGoal() {
  console.log(userStore.user?.token);
  try {
    const data = await $fetch("/api/goal", {
      method: "POST",
      body: {
        text: text.value,
      },
      headers: {
        Authorization: `Bearer ${userStore.user?.token}`,
      },
    });

    refresh();
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
}

const { data, refresh } = await useFetch("/api/goals", {
  headers: {
    Authorization: `Bearer ${userStore.user?.token}`,
  },
});
</script>
<template>
  <div class="max-w-7xl mx-auto pt-14 space-y-5">
    <form
      @submit.prevent="addGoal"
      class="flex flex-row space-x-3 mx-auto justify-center"
    >
      <input
        class="p-2 rounded-md text-gray-600 bg-gray-300"
        type="text"
        v-model="text"
        placeholder="Your Goal"
      />
      <button
        type="submit"
        class="p-2 w-max mx-auto px-4 rounded-md text-white bg-[#34495E]"
      >
        Add Goal
      </button>
    </form>

    <div class="w-2/4 mx-auto">
      <h1 class="text-center text-4xl">YOUR GOALS</h1>
      <div class="flex flex-col space-y-3">
        <span class="p-1 border-2 border-red-400" v-for="goal in data">{{ goal.text }}</span>
      </div>
    </div>
  </div>
</template>
