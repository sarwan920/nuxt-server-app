import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const isAuthenticated = ref(false);

    async function login() {

    }


    return { user, isAuthenticated }
},
    {
        persist: true,
    })