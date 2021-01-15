<template>
    <main class='container-timer shadow-box'>
        <input type="text" placeholder="What are you working on, bro?"/>
        <Timer class="centered-vertically timer"> </Timer>
        <i @click="toggleRecording" class="centered-vertically fas" :class="{ 'fa-play': !isRecording, 'fa-pause': isRecording}"></i>
        <i class="centered-vertically fas fa-stop"></i>
    </main>
</template>

<script>
export default {
    data: () => ({
        isRecording: false,
    }),

    methods: {
        // Read: https://michaelnthiessen.com/this-is-undefined/

        toggleRecording(){
            this.isRecording = !this.isRecording;

            if(!this.isRecording){
                // Stop Recording
                this.$nuxt.$emit('pause-timer', {});

            } else {
                // User has started recording..
                this.$nuxt.$emit('start-timer', {});

            }
        },
    },
}
</script>

<style scoped>

    .container-timer {
        margin: 0 0;
        padding: 0 0;

        height: 100%;
        width: 100%;
        display: grid;

        justify-content: center;
        align-items: center;
        text-align: center;

        grid-template-columns: 8fr 2fr 1fr 1fr;
        grid-template-rows: 1fr;
    }

    .shadow-box {
        height: 100%;
        width: 100%;
        border: 0px solid;
        -webkit-box-shadow: 0px 10px 16px -10px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 10px 16px -10px rgba(0,0,0,0.75);
        box-shadow: 0px 10px 16px -10px rgba(0,0,0,0.75);
        transition: all 250ms ease-in-out;
    }

    .shadow-box:hover {
        -webkit-box-shadow: 0px 14px 16px -10px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 14px 16px -10px rgba(0,0,0,0.75);
        box-shadow: 0px 14px 16px -10px rgba(0,0,0,0.75);
    }

    input {
        height: 100%;
        width: 100%;
        border: 0px;
        text-indent: 3%;
        font-size: 20px;
    }

    .timer {
        display: block;
        height: 100%;
        width: 100%;
    }

    i {
        display: block;
        height: 100%;
        width: 100%;
        text-align: center;
        opacity: 0.8;
    }

    i:hover {
        opacity: 0.4;
    }

    .centered-vertically {
        position:relative;
        top: calc(50% - 10px); /* 50% - 3/4 of icon height */
    }

</style>
