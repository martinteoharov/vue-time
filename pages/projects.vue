<template>
    <div class='container container-main'>
        <div class='box-projects box-shadow'>
            <Projects :names="names" />
        </div>    
        <div class='box-features box-shadow'>
            Features.
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        names: ['TimeTrack', 'Maika Ti', 'HAHa basi qkiq proekt bro', 'niiiice'],
    }),
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
        width: 97.5%;
        margin-left: auto;
        margin-right: auto;
        grid-template-columns: 1fr 3fr;
        grid-column-gap: 2.5%;
    }

    .box-shadow {
        -webkit-box-shadow: 7px 7px 6px -9px rgba(0,0,0,0.88);
        -moz-box-shadow: 7px 7px 6px -9px rgba(0,0,0,0.88);
        box-shadow: 7px 7px 6px -9px rgba(0,0,0,0.88);
        transition: box-shadow 250ms;
    }
    .box-shadow:hover {
        border: 0px solid;
        -webkit-box-shadow: 7px 7px 9px -9px rgba(0,0,0,0.88);
        -moz-box-shadow: 7px 7px 9px -9px rgba(0,0,0,0.88);
        box-shadow: 7px 7px 9px -9px rgba(0,0,0,0.88);
    }

    .box-projects {
        height: 90%;
        width: 100%;
        border-radius: 3px;
        background-color: #f4f0f5;
    }

    .box-features {
        height: 90%;
        width: 100%;
        border-radius: 3px;
        background-color: #f4f0f5;
    }
</style>
