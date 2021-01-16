<template>
    <div class="container container-screen">
        <Sidebar/>
        <div class="container container-main">
            <Tracker/>
            <div class="container container-entries">
                <TrackerEntry v-for="entry in trackerEntries" v-bind:key="entry.startDate" 
                              :name='entry.name' :startDate='entry.startDate' :endDate='entry.endDate' :timer='entry.timer'/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        trackerEntries: [],
    }),
    methods: {
        // Adds an entry container-main
        addTrackerEntry({name, startDate, endDate, timer}){
            console.log('New entry created..');
            
            this.trackerEntries.push({name, 'startDate': startDate.toLocaleDateString(), 'endDate': endDate.toLocaleDateString(), timer});
        }
    },
    created(){
        this.$nuxt.$on('add-entry', (entry) => {
            this.addTrackerEntry(entry);
        });
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
        grid-template-rows: repeat(8, 1fr);
        grid-row-gap: 10px;
    }

</style>
