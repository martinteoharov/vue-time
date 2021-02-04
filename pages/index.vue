<template>
    <div class="container container-main">
        <Tracker/>

        <div class='date'>
            <!--- Classes can be found in ~/layouts/default.vue -->
            <date-picker format="MM/dd/yyyy" input-class="layout-datepicker-input" :calendar-button="true" calendar-button-icon="fa fa-calendar" class='layout-datepicker' v-bind:key="'asdf'" placeholder="MM/DD/YYYY" v-model="dateNow"></date-picker>
        </div>

        <transition-group  enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" tag='div' class='container container-entries'>
            <TrackerEntry v-for="entry in trackerEntries" v-bind:key="entry._id" 
                          :_id='entry._id' :name='entry.name' :startDate='entry.startDate' :endDate='entry.endDate' :timer='entry.timer' :projects='entry.projects' :tags='entry.tags' />
        </transition-group>
    </div>
</template>

<script>
export default {
    middleware: 'authenticated',
    data: () => ({
        dateNow: null,
        trackerEntries: [],
        projects: []
    }),
    methods: {
        fetchPostEntry({ name, startDate, endDate, timer, projects, tags }){
            const simpleDate = startDate.toLocaleDateString();

            // Send tracker to server..
            this.$nuxt.$addTracker({ name, startDate, endDate, simpleDate, timer, projects, tags }).then((res) => {
                if(this.dateNow == res.data.addTracker.simpleDate)
                    this.trackerEntries.push(res.data.addTracker)
            });

        },

        fetchEntriesByDate({ dateNow }){
            this.$nuxt.$getTrackersByDate({ simpleDate: dateNow }).then((res) => {
                this.trackerEntries = res.data.getTrackersByDate;
            });
        },

        fetchRmEntry({_id}){
            this.$nuxt.$rmTracker({_id}).then((res) => {
                for(const el in this.trackerEntries){
                    if(this.trackerEntries[el]._id === _id) 
                        this.trackerEntries.splice(el, 1);
                }
            });
        },
    },
    watch: {
        // Try to avoid this..
        dateNow: function(val){ 
            // This causes the watcher to fire twice, figure out a better way..
            this.dateNow = new Date(val).toLocaleDateString();

            // This is completely useless right now..
            // GraphQL Uses Caching for queries of the same type/name - figure out how to bypass caching & force execute a
            // certain query
            this.fetchEntriesByDate({ dateNow: this.dateNow });
        }
    },
    created(){
        this.dateNow = (new Date()).toLocaleDateString();

        console.log('TrackerEntries:',this.trackerEntries);
        this.fetchEntriesByDate({ dateNow: this.dateNow });
        this.$nuxt.$on('add-entry', this.fetchPostEntry);
        this.$nuxt.$on('delete-entry', this.fetchRmEntry);
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
        grid-template-rows: 1.5fr 3fr 8fr;
    }
    .container-entries {
        height: 100%;
        width: 100%;
        line-height: 2;
        grid-template-columns: 1fr;
        grid-auto-rows: 10vh;
        grid-row-gap: 10px;
        overflow-y: scroll;
    }

    .date {
        display: grid;
        justify-content: center;
        align-items: center;
        text-align: center;
        overflow: visible !important;
    }
</style>
