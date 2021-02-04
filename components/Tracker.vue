<template>
    <main class='container-timer shadow-box'>
        <input ref='trackerInput' v-model='input' type="text" placeholder="What are you working on, bro?"/>

        <Dropdown :items="dropdownProjects" :icon="'fa-folder'"/>
        <Dropdown :items="tags" :icon="'fa-tag'"/>

        <Timer class="centered-vertically timer"> </Timer>

        <i @keydown.enter="toggleRecording" @click="toggleRecording" class="centered-vertically fas" :class="{ 'fa-play': !isRecording, 'fa-stop': isRecording}"></i>
    </main>
</template>

<script>
    export default {
        data: () => ({
            isRecording: false,
            timer: null,
            input: '',
            fetchedProjects: [],
            dropdownProjects: [],
            activeProjects: [],
            tags: [],
        }),

        methods: {
            // Read: https://michaelnthiessen.com/this-is-undefined/
            toggleRecording(){
                this.isRecording = !this.isRecording;

                if(!this.isRecording){
                    // Stop Recording
                    this.$nuxt.$emit('stop-timer', {});
                    console.log(`Projets: ${ this.activeProjects}`);

                    // Store <input> value, projects & tags in $store
                    this.$nuxt.$store.commit('entries/addTracker', { 'name': this.input, 'projects': this.activeProjects, 'tags': this.tags });
                    // Create an entry with the data from the timer.. 
                    // { $name: String, $tags: [$name, $name, ..], $dateStarted: Date, $dateEnded: Date, $timeElapsed: {hs, mn, sc} }
                    // Access data from $store & Append entry to template
                    this.$nuxt.$emit('add-entry', this.$store.state.entries.trackerEntry);

                    // Fetch projects again to check if there are newly created ones
                    // this.fetchProjects();

                    // Clear variables
                    this.input = '';
                    this.activeProjects = [];

                } else {
                    // User has started recording..
                    this.$nuxt.$emit('start-timer', {});
                }
            },
            inputHandler(){
                /* --------- Parse Input --------- */
                const rtn = this.$nuxt.$parse(this.input);

                this.tags = rtn.tokens.tags;
                this.activeProjects = rtn.tokens.projects;

                // Remove duplicated items between newly created projects & projects already known to exist
                this.dropdownProjects = this.$nuxt.$removeDuplicates(this.activeProjects.concat(this.fetchedProjects));

                /* --------- AutoCompletion --------- */
                const src = (rtn.last.type === 'tag' ? ['gotini', 'golemi'] : ['nikoi']);
                const res = this.$nuxt.$AutoComplete(rtn.last.input, src);
            },
            keyboardNav(e){
                // On keyPress 'enter' toggle the recording and unfocus input box
                if(e.keyCode === 13){
                    // If trackerInput is focused, unfocus it - making the user click enter twice
                    if(document.activeElement === this.$refs.trackerInput && this.isRecording){
                        this.$refs.trackerInput.blur();
                        return;
                    }

                    this.toggleRecording();
                    this.$refs.trackerInput.blur();

                }
                // On keyPress 'a' focus the input box
                if(e.keyCode === 65){
                    // Avoid the 'a' that is instantly entered in the input box at first
                    setTimeout(() => this.$refs.trackerInput.focus(), 10); // Super hacky, but we are experts so everything is allowed.
                }
            },
            fetchProjects(){
                this.$nuxt.$getAllProjects.then((res) => {
                    this.fetchedProjects = res.data.getAllProjects.map(function(item) {
                        return item.name;
                    });
                    console.log(this.fetchedProjects);
                    // Update Projects
                    this.inputHandler();
                });
            }
        },
        created() {
            this.isRecording = false;
            this.timer = null;
            this.input = '';

            window.addEventListener('keydown', this.keyboardNav);

            this.fetchProjects();
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

        grid-template-columns: 6fr minmax(50px, 0.3fr) minmax(50px, 0.3fr) minmax(100px, 1fr) minmax(40px, 0.75fr);
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
