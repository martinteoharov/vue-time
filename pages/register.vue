<template>
    <main>
        <h1> Register </h1>
        <form @submit.prevent="register" action="">
            <p> Username: </p>
            <input v-model='username' name='username'/>
            <p> Password: </p>
            <input v-model='password' name='password' type='password'/>
            <button type='submit'> Submit </button>
            <a href="/login"> Login </a>
        </form>
    </main>
  
</template>

<script>
    import gql from 'graphql-tag'
    export default {
        middleware: 'notAuthenticated',
        data: () => ({
            username: null,
            password: null,
        }),
        methods: {
            register (){
                // Create User obj..
                const user = {'username': this.username, 'password': this.password};
                if(!user.username || !user.password) 
                    return;

                // Send User obj to apollo server..
                this.$apollo.mutate({
                    mutation: gql(`mutation Register($username: String!, $password:String!) {
                                      register(username: $username, password:$password)
                                  }`),
                    variables: {
                        username: this.username,
                        password: this.password
                    }
                }).then((res) => {
                    const token = res.data.register || '';
                    this.$nuxt.$store.commit('auth/addAuth', { token });
                    this.$router.push('/');
                });
            },
        }
    }
</script>

<style scoped>
    h1 {
        padding-top: 30px;
        text-align: center;
    }
    form {
        width: 400px;
        height: 80vh;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5vh;
        border: 1px solid black;
        position: relative;
    }
    form > input {
        margin-left: 10%;
        width: 80%;
    }
    form > p {
        padding-left: 10%;
        padding-top: 20px;
        padding-bottom: 10px;
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
