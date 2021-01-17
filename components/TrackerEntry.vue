<template>
    <div class='container-entry shadow-box hover-fx'>
        <input v-bind:value="name"/>
        <p>  {{ `${startDate} - ${endDate} `}}  </p>
        <p>  {{ timer }} </p>
        <div @click='deleteEntry' class='delete-entry'>
            <p> Delete </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        startDate: String,
        endDate: String,
        timer: String
    },
    data: () => ({
    }),
    methods: {
        deleteEntry(){
            console.log(`Delete entry ${this.startDate}`);

            // Delete entry... with $this.startDate as identifier
            this.$nuxt.$emit('delete-entry', {'name': this.name, 'startDate': this.startDate, 'endDate': this.endDate, 'timer': this.timer});
        }
    }
}
</script>

<style scoped>
    div {
        height: 100%;
        width: 100%;
        font-size: 15px;
    }

    p {
        text-align: left;
    }

    .container-entry {
        display: grid;
        justify-content: center;
        align-items: center;

        grid-template-columns: 6fr 1.5fr 0.75fr .5fr .1fr;
        grid-template-rows: 1fr;
    }

    .shadow-box {
        border: 0px solid;
        -webkit-box-shadow: 0px 5px 8px -7px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 8px -7px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 8px -7px rgba(0,0,0,0.75);
        background-color: rgba(185, 167, 196, 0.1);
    }
    .shadow-box:hover {
        background-color: rgba(185, 167, 196, 0.2);
    }

    input { 
        height: 100%;
        width: 100%;
        font-size: 15px;

        text-align: left;
        text-indent: 3%;

        border: 0px;
        background-color: rgba(0, 0, 0, 0.0);
    }
    div.delete-entry {
        height: 100%;

        /* Center the text */
        display: grid;
        align-items: center;
        justify-items: center;
        visibility: hidden;
    }
    .hover-fx:hover .delete-entry {
        background-color: rgba(245, 24, 58, 0.6);
        visibility: visible;
        user-select: none;
    }



</style>
