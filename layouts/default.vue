<template>
    <div>
        <Nuxt />
    </div>
</template>

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
    /* Calendar on Index.vue */
    .date {
        display: grid;
        justify-content: center;
        align-items: center;
        text-align: center;
        overflow: visible !important;
    }
    .datepicker {
        display: inline-block;
        overflow: visible !important;
        color: gray;
    }
    .datepicker-input {
        border: 0px solid black;
        text-align: center;
        font-size: 20px;
        border-bottom: 1px solid black;
        outline: none;
        width: 125px;
    }
</style>
