<template>
    <div class="dropdown">
        <button class="dropbtn">
            <i class="centered-vertically fas" :class="icon"/> 
        </button>
        <div class="dropdown-content">
            <a v-for="item in items" v-bind:key="item"> {{ item }} </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
        icon: String
    },
    data: () => ({

    }),
}
</script>

<style scoped>
    .dropdown {
        float: left;
        overflow: hidden;
    }

    .dropdown .dropbtn {
        font-size: 16px;  
        border: none;
        outline: none;
        color: inherit;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
        display: block;
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
</style>
