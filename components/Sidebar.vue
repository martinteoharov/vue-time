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
            { type: 'button', name: 'Track',    link: '/',         icon: 'fa-clock'       },
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
        min-width: 180px;

        /* Main Color */
        color: #6e6968; 
        /* Main Background Color */
        background-color: #212436;
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
        width: 90%;
        text-align: left;
        text-indent: 5%;
        background-color: #C4C4C4;
        background-color: rgba(196, 196, 196, 0.1);
        border-radius: 5px;
        color: white;
    }

    .button-active {
        color: white; 
        background-color: rgba(196, 196, 196, 0.4);
    }

    i {
        display: inline;
        margin-top: 5%;
        float:left;
        padding-left: 10%;
    }
</style>
