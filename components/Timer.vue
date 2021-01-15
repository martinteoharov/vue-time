<template>
    <main>
          {{ timePassed }}
    </main>
</template>

<script>
export default {
    data: () => ({
        updateInterval: null,

        count: { seconds: 0, minutes: 0, hours: 0 },
        dateStarted: null,
        speed: 1000,
    }),
    methods: {
        updateTimeRemaining(){
            const total = new Date().getTime() - Date.parse(this.dateStarted);

            this.count.seconds = Math.floor((total / 1000) % 60);
            this.count.minutes = Math.floor((total / 1000 / 60) % 60);
            this.count.hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        },
        start() {
            // If clock has been stopped (not paused) before, we initialize the data
            if(this.dateStarted === null){
                console.log(`Recording started... ${ new Date() }` );
                this.count.seconds = 0;
                this.count.minutes = 0;
                this.count.hours = 0;
                this.dateStarted = new Date();
            } else {
                this.dateStarted = new Date();
                console.log(`Recording resumed... ${ this.dateStarted }` );
            }

            // Set updateInterval
            this.updateInterval = setInterval(this.updateTimeRemaining, this.speed); 
        },
        pause() {
            console.log(`Recording paused... ${ this.timePassed }` );
            this.datePaused = new Date();

            // Do some data processing here
            // ...

            // Stop updating the data for now..
            clearInterval(this.updateInterval);
        },
    },
    computed: {
        timePassed: {
            get: function(){
                return `${ ('0' + this.count.hours).slice(-2) } : ${ ('0' + this.count.minutes).slice(-2) } : ${ ('0' + this.count.seconds).slice(-2) }`;
            }
        }
    },

    // Set up event listeners on creation
    created() {
        this.$nuxt.$on('start-timer', this.start);
        this.$nuxt.$on('pause-timer', this.pause);
    },

    // Clean up event listeners before component is destroyed
    beforeDetroy() {
        this.$nuxt.$off('start-timer', this.start);
        this.$nuxt.$off('pause-timer', this.pause);
    }
}
</script>

<style>

</style>
