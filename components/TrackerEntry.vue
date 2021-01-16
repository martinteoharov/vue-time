<template>
    <div class='container-entry shadow-box'>
        <input v-bind:value="name"/>
        <p>  {{ `${startDate} - ${endDate} `}}  </p>
        <p>  {{ timer }} </p>
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

        grid-template-columns: 6fr 1.5fr 1fr;
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


</style>
