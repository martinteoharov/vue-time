<template>
    <main>
        <h1> TimeTrack </h1>
        <NuxtLink tag='div' :to="link.link" class="button" v-for="(link, index) in links" :key="index">
        <i class="fas" :class="link.icon"> </i>
        <Button v-bind:title='link.name'></Button>
        </NuxtLink>
    </main>
</template>

<script>
export default {
    data: () => ({
        links: [
            { type: 'button', name: 'Timer',    link: '/',         icon: 'fa-clock'       },
            { type: 'button', name: 'Reports',  link: '/reports',  icon: 'fa-sticky-note' },
            { type: 'button', name: 'Insights', link: '/insights', icon: 'fa-lightbulb'   },
            { type: 'button', name: 'Projects', link: '/projects', icon: 'fa-folder'      },
            { type: 'button', name: 'Tags',     link: '/tags',     icon: 'fa-tag'         },
        ]
    }),
    methods: {
    }
}
</script>

<style scoped>
    main {
        height: 100vh;
        text-align: center;
        min-width: 200px;

        /* Main Color */
        color: #3c354a; 
        /* Main Background Color */
        background-color: #1B1725;
    }

    h1 {
        text-align: center;
        color: #efdbff; 
        font-size: 30px;
        line-height: 20vh;
        transition: all 250ms ease-in-out;
    }

    .button {
        margin-top: 5%;
        margin-left: auto;
        margin-right: auto;
        width: 95%;
        text-align: left;
        text-indent: 5%;
        background-color: inherit;
        border-radius: 5px;
    }

    .button-active {
        color: #efdbff; 
        background-color: inherit;
    }

    i {
        display: inline;
        margin-top: 5%;
        float:left;
        padding-left: 10%;
    }
</style>
