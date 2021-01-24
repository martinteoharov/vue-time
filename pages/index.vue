<template>
    <div class="container container-screen">
        <Sidebar/>
        <div class="container container-main">
            <Tracker/>
            <transition-group  enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown" 
                tag='div' class='container container-entries'>

                <TrackerEntry v-for="entry in trackerEntries" v-bind:key="entry._id" 
                              :_id='entry._id' :name='entry.name' :startDate='entry.startDate' :endDate='entry.endDate' :timer='entry.timer'/>
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
        // Adds an entry container-main
        fetchPostEntry({name, startDate, endDate, timer}){
            const mutation = gql` mutation AddTrackers($name: String!, $startDate:String!, $endDate: String!, $timer: String!) { addTracker(name: $name, startDate: $startDate, endDate: $endDate, timer: $timer){ _id name startDate endDate timer } }`;

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
                const lazy = [];
                lazy.push(res.data.addTracker);
                this.trackerEntries.push(this.simplifyDate(lazy)[0]);
            });
        },
        fetchGetEntries(){
            const query = gql` query GetTrackers { getAllTrackers { _id name startDate endDate timer } }`;

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
                this.trackerEntries = this.simplifyDate(entries);
            });
        },
        fetchRmEntry({_id}){
            const mutation = gql` mutation RemoveTracker($_id: String!) { removeTracker(_id: $_id) }`;
            console.log(_id);
            this.$apollo.mutate({
                mutation: mutation,
                variables: {
                    _id,
                },
                context: {
                    headers: {
                        'authorization': `Bearer ${ this.$store.state.auth.token }`,
                    }
                }
            }).then((res) => {
                console.log(res);
                for(const el in this.trackerEntries){
                    if(this.trackerEntries[el]._id === _id) 
                        this.trackerEntries.splice(el, 1);
                }
            });

        },
        simplifyDate(arr){
            arr.forEach(element => {
                element.startDate = new Date(element.startDate).toLocaleTimeString();
                element.endDate = new Date(element.endDate).toLocaleTimeString();
            });
            return arr;
        },
    },
    created(){
        this.$nuxt.$on('add-entry', (entry) => {
            // Post entry to GraphQL API
            this.fetchPostEntry(entry);
        });

        this.$nuxt.$on('delete-entry', ({_id}) => {
            // Find & Remove entry from DOM..
            /*
            for(const el in this.trackerEntries){
                if(this.trackerEntries[el].startDate === startDate) 
                    this.trackerEntries.splice(el, 1);
            }
            */
            this.fetchRmEntry({_id});

            // TODO: Send remove request to the server..

        });

        // Fetch all entries
        this.fetchGetEntries();
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
