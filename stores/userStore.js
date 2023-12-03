import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const isAuthenticated = ref(false);

    return { user, isAuthenticated }
},
    {
        persist: true,
    }
)