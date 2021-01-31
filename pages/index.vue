<template>
    <div class="container container-main">

        <div class='date'>
            <!--- Classes can be found in ~/layouts/default.vue -->
            <date-picker format="MM/dd/yyyy" input-class="datepicker-input" wrapper-class="datepicker-wrapper":calendar-button="true" :calendar-button-icon="'fa fa-calendar'" class='datepicker' v-bind:key="'asdf'" placeholder="MM/DD/YYYY" v-model="dateNow"></date-picker>
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
    }),
    methods: {
        fetchPostEntry({ name, startDate, endDate, timer, projects, tags }){
            console.log('fetchPostEntry');

            const simpleDate = startDate.toLocaleDateString();
            this.$nuxt.$addTracker({ name, startDate, endDate, simpleDate, timer, projects, tags }).then((res) => {
                this.trackerEntries.push(res.data.addTracker)
            });
        },

        fetchEntriesByDate({ dateNow }){
            console.log('fetchGetEntries');
            this.$nuxt.$getTrackersByDate({ simpleDate: dateNow }).then((res) => {
                this.trackerEntries = res.data.getTrackersByDate;
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
    watch: {
        // Try to avoid this..
        dateNow: function(val){ 
            this.dateNow = new Date(val).toLocaleDateString();
            this.fetchEntriesByDate({ dateNow: this.dateNow });
        }
    },
    created(){
        this.dateNow = (new Date()).toLocaleDateString();

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
    .container-main {
        height: 100%;
        width: 100%;
        grid-template-rows: 2fr 6fr;
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
</style>
