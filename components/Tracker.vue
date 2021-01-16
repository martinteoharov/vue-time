<template>
    <main class='container-timer shadow-box'>
        <input v-model='input' type="text" placeholder="What are you working on, bro?"/>
        <Timer class="centered-vertically timer"> </Timer>
        <i @click="toggleRecording" class="centered-vertically fas" :class="{ 'fa-play': !isRecording, 'fa-stop': isRecording}"></i>
    </main>
</template>

<script>
export default {
    data: () => ({
        isRecording: false,
        timer: null,
        input: null
    }),

    methods: {
        // Read: https://michaelnthiessen.com/this-is-undefined/
        toggleRecording(){
            this.isRecording = !this.isRecording;

            if(!this.isRecording){
                // Stop Recording
                this.$nuxt.$emit('stop-timer', {});

                // Store <input> value in $store
                this.$nuxt.$store.commit('entries/addName', {'name': this.input});

                // Create an entry with the data from the timer.. 
                // { $name: String, $tags: [$name, $name, ..], $dateStarted: Date, $dateEnded: Date, $timeElapsed: {hs, mn, sc} }
                // Access data from $store
                this.$nuxt.$emit('add-entry', this.$store.state.entries.trackerEntry);

                // Append entry to template...

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

        grid-template-columns: 8fr 2fr 1fr;
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
