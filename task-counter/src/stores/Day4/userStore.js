import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
    const currentUser = ref('')
    const isLoggedIn = ref(false)

    function login(name) {
        currentUser.value = name
        isLoggedIn.value = true
    }

    return { currentUser, isLoggedIn, login }
})