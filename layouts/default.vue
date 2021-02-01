<template>
    <div class='layout-container layout-container-screen'>
        <Sidebar/>
        <div class='layout-container layout-container-main'>
            <Tracker/>
            <Nuxt />
        </div>
    </div>
</template>

<!--- GLOBAL CSS --> 
<!--- Use 'layout' as a prefix for any class here --> 
<style>
    html {
        font-family:
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        overflow-y: hidden;
        overflow-x: hidden;
    }
    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }

    /* Calendar in Index.vue */
    .layout-datepicker {
        display: inline-block;
        overflow: visible !important;
        color: black;
        border-bottom: 1px solid black;
        opacity: 0.8;
    }
    .layout-datepicker:hover {
        opacity: 1;
    }
    .layout-datepicker-input {
        border: 0px solid black;
        text-align: center;
        font-size: 20px;
        outline: none;
        width: 125px;
    }

    /* Grid */
    .layout-container {
        margin: 0 0;
        padding: 0 0;
        display: grid;
        justify-content:  center;
        align-items: center;
        text-align: center;
    }

    .layout-container-screen {
        height: 100vh;
        width: 100vw;
        grid-template-columns: 1fr 6fr;
    }

    .layout-container-main {
        height: 100%;
        width: 100%;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 6fr;
    }
</style>
