import { initializeApp } from 'firebase/app'

export default async () => {
    try {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCOBc2_A553jrUqPJ7MO5W2w6jpyvm8Aog",
            authDomain: "nuxt-server-eaba6.firebaseapp.com",
            projectId: "nuxt-server-eaba6",
            storageBucket: "nuxt-server-eaba6.appspot.com",
            messagingSenderId: "998158517585",
            appId: "1:998158517585:web:f0b83042b7c71b18547f70"
        };
        const app = initializeApp(firebaseConfig);
        // console.log(app);

    } catch (error) {
        console.log(error)

    }
}