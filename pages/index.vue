<template>
    <div class="container container-screen">
        <Sidebar/>
        <div class="container container-main">
            <Tracker/>
            <transition-group  enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown" tag='div' class='container container-entries'>

                <TrackerEntry v-for="entry in trackerEntries" v-bind:key="entry._id" 
                              :_id='entry._id' :name='entry.name' :startDate='entry.startDate' :endDate='entry.endDate' :timer='entry.timer' :projects='entry.projects' :tags='entry.tags' />
            </transition-group>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    middleware: 'authenticated',
    data: () => ({
        trackerEntries: [],
    }),
    methods: {
        fetchPostEntry({ name, startDate, endDate, timer, projects, tags }){
            const mutation = gql` mutation ($name: String!, $startDate: String!, $endDate: String!, $timer: String!, $projects: [String], $tags: [String]) { addTracker(name: $name, startDate: $startDate, endDate: $endDate, timer: $timer, projects: $projects, tags: $tags){ _id name startDate endDate timer projects tags } }`;

            console.log({ name, startDate, endDate, timer, projects, tags });
            this.$apollo.mutate({
                mutation: mutation,
                variables: { name, startDate, endDate, timer, projects, tags },
                context: {
                    headers: { 'authorization': `Bearer ${ this.$store.state.auth.token }`, }
                }
            }).then((res) => {
                this.trackerEntries.push(res.data.addTracker);
            });
        },
        fetchGetEntries(){
            console.log('fetchGetEntries');
            const query = gql` { getAllTrackers { _id name startDate endDate timer } }`;

            this.$apollo.query({
                query: query,
                variables: { },
                context: {
                    headers: { 'authorization': `Bearer ${ this.$store.state.auth.token }`, }
                }
            }).then((res) => {
                const entries = res.data.getAllTrackers;
                this.trackerEntries = entries;
            });
        },
        fetchRmEntry({_id}){
            const mutation = gql` mutation RemoveTracker($_id: String!) { removeTracker(_id: $_id) }`;
            console.log(_id);
            this.$apollo.mutate({
                mutation: mutation,
                variables: { _id, },
                context: {
                    headers: { 'authorization': `Bearer ${ this.$store.state.auth.token }`, }
                }
            }).then((res) => {
                for(const el in this.trackerEntries){
                    if(this.trackerEntries[el]._id === _id) 
                        this.trackerEntries.splice(el, 1);
                }
            });
        },
    },
    created(){
        this.$nuxt.$on('add-entry', this.fetchPostEntry);
        this.$nuxt.$on('delete-entry', this.fetchRmEntry);
        this.fetchGetEntries();
    },
    mounted(){
        console.log('mounted');
    },
    // Clean up event listeners before component is destroyed
    beforeDestroy() {
        this.$nuxt.$off('add-entry', this.fetchPostEntry);
        this.$nuxt.$off('delete-entry', this.fetchRmEntry);
    }
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
    .container-screen {
        height: 100vh;
        width: 100vw;
        grid-template-columns: 1fr 6fr;
    }
    .container-main {
        height: 100%;
        width: 100%;

        grid-template-columns: 1fr;
        grid-template-rows: 1fr 6fr;
    }
    .container-entries {
        height: 100%;
        width: 100%;

        padding-top: 5%;
        grid-template-columns: 1fr;
        grid-auto-rows: 10vh;
        grid-row-gap: 10px;
        overflow-y: scroll;
    }

    /* Transition animations */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>
