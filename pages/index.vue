<template>
    <div class="container container-screen">
        <Sidebar/>
        <div class="container container-main">
            <Tracker/>
            <transition-group  enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__backOutUp" 
                tag='div' class='container container-entries'>

                <TrackerEntry v-for="entry in trackerEntries" v-bind:key="entry.startDate" 
                              :name='entry.name' :startDate='entry.startDate' :endDate='entry.endDate' :timer='entry.timer'/>
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
    apollo: {
    },
    methods: {
        // Adds an entry container-main
        addTrackerEntry({name, startDate, endDate, timer}){
            const mutation = gql`
                    mutation AddTrackers($name: String!, $startDate:String!, $endDate: String!, $timer: String!) {
                         addTracker(name: $name, startDate: $startDate, endDate: $endDate, timer: $timer)
                    }`;
            console.log(mutation);
            this.$apollo.mutate({
                mutation: mutation,
                variables: {
                    name,
                    startDate,
                    endDate,
                    timer
                },
                context: {
                    headers: {
                        'authorization': `Bearer ${ this.$store.state.auth.token }`,
                    }
                }
            }).then((res) => {
                console.log(res);
                this.trackerEntries.push({name, 'startDate': startDate.toLocaleTimeString(), 'endDate': endDate.toLocaleTimeString(), timer});
            });
        },
        fetchEntries(){
            const query = gql`
                    query GetTrackers {
                        getAllTrackers {
                            startDate
                            endDate
                            timer
                        }
                    }`;

            this.$apollo.query({
                query: query,
                variables: {
                },
                context: {
                    headers: {
                        'authorization': `Bearer ${ this.$store.state.auth.token }`,
                    }
                }
            }).then((res) => {
                const entries = res.data.getAllTrackers;
                entries.forEach(element => {
                    const startDate = new Date(element.startDate).toLocaleTimeString();
                    element.startDate = startDate;
                    const endDate = new Date(element.endDate).toLocaleTimeString();
                    element.endDate = endDate;
                });
                this.trackerEntries = res.data.getAllTrackers;
            });
        }
    },
    created(){
        this.$nuxt.$on('add-entry', (entry) => {
            // Append entry to DOM..
            this.addTrackerEntry(entry);

            // TODO: Send entry to server..

        });

        this.$nuxt.$on('delete-entry', ({startDate}) => {
            // Find & Remove entry from DOM..
            for(const el in this.trackerEntries){
                if(this.trackerEntries[el].startDate === startDate) 
                    this.trackerEntries.splice(el, 1);
            }

            // TODO: Send remove request to the server..

        });

        // Fetch all entries
        this.fetchEntries();
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
