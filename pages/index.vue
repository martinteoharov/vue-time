<template>
    <div class="container-screen">
        <Sidebar>
        </Sidebar>
        <div class="container-main">
            <Tracker>
            </Tracker>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    .container-screen {
        margin: 0 0;
        padding: 0 0;

        height: 100vh;
        width: 100vw;
        display: grid;
        justify-content: center;
        align-items: center;
        text-align: center;
        grid-template-columns: 1fr 6fr;
    }
    .container-main {
        margin: 0 0;
        padding: 0 0;

        height: 100%;
        width: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        text-align: center;

        grid-template-columns: 1fr;
        grid-template-rows: 1fr 6fr;
    }

</style>
