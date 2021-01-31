<template>
    <div class='container-entry shadow-box hover-fx'>
        <input v-bind:value="name"/>

        <Dropdown class='icon' :items="projects" :icon="'fa-folder'"/>
        <Dropdown class='icon' :items="tags" :icon="'fa-tag'"/>

        <p>  {{ `${simplifyDate(startDate)} - ${simplifyDate(endDate)} `}}  </p>
        <p>  {{ timer }} </p>
        <div @click='deleteEntry' class='delete-entry'>
            <p> Delete </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        _id: String,
        name: String,
        startDate: String,
        endDate: String,
        timer: String,
        projects: Array,
        tags: Array
    },
    data: () => ({
    }),
    methods: {
        deleteEntry(){
            // Delete entry... with $this.startDate as identifier
            this.$nuxt.$emit('delete-entry', {'_id': this._id, 'name': this.name, 'startDate': this.startDate, 'endDate': this.endDate, 'timer': this.timer});
        },
        simplifyDate(obj){
            return new Date(obj).toLocaleTimeString();
        },
    },
}
</script>

<style scoped>
    div {
        height: 100%;
        width: 100%;
        font-size: 15px;
    }

    p {
        text-align: center;
    }

    .container-entry {
        display: grid;

        justify-content: center;
        align-items: center;
        text-align: center;

        grid-template-columns: 6fr minmax(50px, 0.3fr) minmax(50px, 0.3fr) minmax(200px, 1.75fr) minmax(100px, .75fr) minmax(60px, .5fr) .1fr;
        grid-template-rows: 1fr;
        border-radius: 15px;
    }

    .shadow-box {
        border: 0px solid;
        -webkit-box-shadow: 0px 5px 8px -7px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 8px -7px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 8px -7px rgba(0,0,0,0.75);
        background-color: rgba(185, 167, 196, 0.25);
    }
    .shadow-box:hover {
        background-color: rgba(185, 167, 196, 0.4);
    }

    input { 
        height: 100%;
        width: 100%;
        font-size: 15px;

        text-align: left;
        text-indent: 3%;

        border: 0px;
        background-color: rgba(0, 0, 0, 0.0);
        outline: none;
    }
    div.delete-entry {
        height: 100%;

        /* Center the text */
        display: grid;
        align-items: center;
        justify-items: center;
        visibility: hidden;
        border-radius: 5px;
    }
    .hover-fx:hover .delete-entry {
        background-color: rgba(245, 24, 58, 0.6);
        visibility: visible;
        user-select: none;
    }

    .icon {
        height: 50px;
        top: calc(50% - 30px); /* 50% - 3/5 of icon height */
    }
</style>
