<template>
    <main class='container-timer shadow-box'>
        <input ref='trackerInput' v-model='input' type="text" placeholder="What are you working on, bro?"/>

        <Dropdown :items="projects" :icon="'fa-folder'"/>
        <Dropdown :items="tags" :icon="'fa-tag'"/>

        <Timer class="centered-vertically timer"> </Timer>

        <i @keydown.enter="toggleRecording" @click="toggleRecording" class="centered-vertically fas" :class="{ 'fa-play': !isRecording, 'fa-stop': isRecording}"></i>
    </main>
</template>

<script>
    import SParser from '/modules/parser.js'
    export default {
        data: () => ({
            isRecording: false,
            timer: null,
            input: null,
            projects: [],
            tags: [],
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
                    // Access data from $store & Append entry to template...
                    this.$nuxt.$emit('add-entry', this.$store.state.entries.trackerEntry);

                    // Clear input box
                    this.input = '';

                } else {
                    // User has started recording..
                    this.$nuxt.$emit('start-timer', {});
                }
            },
            inputHandler(e){
                const rtn = SParser.parse(this.input).tokens;
                console.log(rtn);

                this.tags = rtn.tags;
                this.projects = rtn.projects;
            },
            keyboardNav(e){
                // On keyPress 'enter' toggle the recording and unfocus input box
                if(e.keyCode === 13){
                    this.toggleRecording();
                    this.$refs.trackerInput.blur();
                }
                // On keyPress 'a' focus the input box
                if(e.keyCode === 65){
                    // Avoid the 'a' that is instantly entered in the input box at first
                    setTimeout(() => this.$refs.trackerInput.focus(), 10); // Super hacky, but we are experts so everything is allowed.
                }
            }
        },
        created() {
            this.isRecording = false;
            this.timer = null;
            this.input = null;

            window.addEventListener('keydown', this.keyboardNav);
        },

        mounted() {
            // $refs gets initialized in the mounted hook, so we can use it..
            this.$refs.trackerInput.addEventListener('input', this.inputHandler);
        },

        // Clean up event listeners..
        beforeDestroy(){
            window.removeEventListener('keydown', this.keyboardNav);
            this.$refs.trackerInput.removeEventListener('input', this.inputHandler);
        }
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

        grid-template-columns: 6fr minmax(30px, 0.3fr) minmax(30px, 0.3fr) minmax(100px, 1fr) minmax(40px, 0.75fr);
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
        border: none;
        text-indent: 3%;
        font-size: 20px;
        opacity: 0.6;
    }
    input:focus {
        opacity: 1;
        outline: none; /* fuck chrome */
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
