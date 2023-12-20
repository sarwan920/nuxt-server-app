<script setup>
import { useUserStore } from "~/stores/userStore";
// const { $gsap } = useNuxtApp();

const userStore = useUserStore();
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Goals",
  description: "Page contains your goals.",
});

const text = ref("");

async function deleteGoal(id) {
  console.log(id);
  try {
    const data = await $fetch(`/api/goal/${id}`, {
      method: "DELETE",
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

async function editGoal() {}
async function addGoal(id) {
  try {
    const data = await $fetch(`/api/goal`, {
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

    <div class="mx-auto space-y-4">
      <h1 class="title text-center text-4xl">YOUR GOALS</h1>

      <div class="flex flex-col">
        <div
          v-for="goal in data"
          class="flex justify-between odd:bg-gray-400 even:bg-green-50 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md p-2"
        >
          <span class="p-1 w-2/3 my-auto">{{ goal.text }}</span>
          <div class="my-auto space-x-4">
            <button
              class="bg-gray-300 px-4 py-2 rounded-md"
              @click="editGoal(goal._id)"
            >
              Edit
            </button>
            <button
              class="bg-red-300 px-4 py-2 rounded-md"
              @click="deleteGoal(goal._id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

