<template>
    <main class='container'>
        <div>
            <input type="text" placeholder="What are you working on, bro?"/>
            <i class="fas fa-play"></i>
        </div>
    </main>
</template>

<script>
export default {

}
</script>

<style scoped>
    .container {
        margin: 0 0;
        padding: 0 0;

        height: 100%;
        width: 100%;
        display: grid;

        justify-content: center;
        align-items: center;
        text-align: center;

        grid-template-columns: 1fr;
        grid-template-rows: 1fr 8fr;
    }
    div {
        height: 100%;
        width: 100%;
        border: 0px solid;
        -webkit-box-shadow: 0px 10px 16px -10px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 10px 16px -10px rgba(0,0,0,0.75);
        box-shadow: 0px 10px 16px -10px rgba(0,0,0,0.75);
        transition: all 250ms ease-in-out;
    }
    div:hover {
        -webkit-box-shadow: 0px 14px 16px -10px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 14px 16px -10px rgba(0,0,0,0.75);
        box-shadow: 0px 14px 16px -10px rgba(0,0,0,0.75);
    }
    input {
        height: 100%;
        width: 90%;
        float: left;
        border: 0px;
        text-indent: 3%;
        font-size: 20px;
    }
    i {
        position:relative;
        top: calc(50% - 10px); /* 50% - 3/4 of icon height */
        text-align: center;
    }

</style>
