<template>
    <div class="container container-screen">
        <Sidebar/>
        <div class="container container-main">
            <Tracker/>
            <transition-group  enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" tag='div' class='container container-entries'>

                <TrackerEntry v-for="entry in trackerEntries" v-bind:key="entry._id" 
                              :_id='entry._id' :name='entry.name' :startDate='entry.startDate' :endDate='entry.endDate' :timer='entry.timer' :projects='entry.projects' :tags='entry.tags' />
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'authenticated',
    data: () => ({
        trackerEntries: [],
    }),
    methods: {
        fetchPostEntry({ name, startDate, endDate, timer, projects, tags }){
            console.log('fetchPostEntry');
            this.$nuxt.$addTracker({ name, startDate, endDate, timer, projects, tags }).then((res) => {
                this.trackerEntries.push(res.data.addTracker)
            });
        },
        fetchEntries(){
            console.log('fetchGetEntries');
            this.$nuxt.$getAllTrackers.then((res) => {
                this.trackerEntries = res.data.getAllTrackers;
            });
        },
        fetchRmEntry({_id}){
            console.log('fetchRmEntry');
            this.$nuxt.$rmTracker({_id}).then((res) => {
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
        this.fetchEntries();
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
</style>
