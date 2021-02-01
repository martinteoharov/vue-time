<template>
    <main class='container container-projects'>

        <input type="text" placeholder="Search...">

        <div class='container container-projects-names'>
            <a class='entry' v-for="name in names" v-bind:key="name"> {{ name }} </a>
        </div>

    </main>
</template>

<script>
export default {
    props: {
        names: Array
    },
    data: () => ({
    }),

}
</script>

<style scoped>
    .container {
        margin: 0 0;
        padding: 0 0;

        display: grid;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    /* Date & Entries */
    .container-projects {
        height: 100%;
        width: 100%;

        grid-row-gap: 5%;
        grid-template-rows: 1fr 6fr;
    }

    .container-projects-names {
        height: 100%;
        width: 100%;

        grid-row-gap: 2.5%;
        grid-auto-rows: 7.5%;
        overflow-y: auto;
    }
    a {
        display: block;
        width: 100%;
        height: 100%;
    }

</style>
