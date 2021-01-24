<template>
    <main> 
        <h1> Logout </h1>
        <button @click='logout'> Log Out </button>
    </main>
  
</template>

<script>
    import gql from 'graphql-tag'
    export default {
        middleware: 'authenticated',
        methods: {
            logout (){
                console.log('log out..');
                this.$nuxt.$store.commit('auth/rmAuth');
                this.$router.push('/');
            },
        }
}
</script>

<style scoped>
    h1 {
        padding-top: 30px;
        text-align: center;
    }
    button {
        margin-left: 45%;
        width: 10%;
    }

</style>
