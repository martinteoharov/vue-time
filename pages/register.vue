<template>
    <form method="post" @submit.prevent="register">
        <p>Username</p>
        <input type="text" name="username" v-model="username" required/>

        <p>Email</p>
        <input type="email" name="email" v-model="email" required />

        <p>Password</p>
        <input type="password" name="password" v-model="password" required />

        <button type="submit">Register</button>
        <a href='/login'> Login </a>
    </form>
</template>

<script>

export default {
    components: {
        Notification,
    },

    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: null
        }
    },

    methods: {
        async register() {
            try {
                await this.$axios.post('register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                })

                await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    },
                })

                this.$router.push('/')
            } catch (e) {
                this.error = e.response.data.message
            }
        }
    }
}
</script>
<style scoped>
    form {
        width: 20vw;
        height: 50vh;
        margin-left: auto;
        margin-right: auto;
        margin-top: 25vh;
        border: 1px solid black;
        position: relative;
    }
    form > input {
        margin-left: 10%;
        width: 80%;
    }
    form > p {
        padding: 16px 16px;
    }
    form > button {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 16px 16px;
    }
    form > a { 
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 16px 16px;
    }

</style>
