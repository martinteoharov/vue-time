<template>
    <main>
        <button @click='logout'> Log Out </button>
    </main>
    
</template>

<script>
export default {
    middleware: 'auth',
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.push('/')
        },
    },
}
</script>

<style scoped>
    div {
        width: 100%;
    }
    button { 
        margin-left: 45vw;
        margin-top: 50vh;
    }

</style>
