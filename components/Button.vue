<template>
    <div class="wrapper">
        <a href="#">
            <span> {{ title }}</span>
        </a>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }

}
</script>

<style scoped>

    a {
        display: block;
        width: 100%;

        margin-left: auto;
        margin-right: auto;

        line-height: 5vh;
        font-size: 18px;
        text-decoration: none;
        color: inherit;
        letter-spacing: 2px;
        position: relative;
        transition: all .25s;
    }

    a span {
        position: relative;
        z-index: 2;
    }

    span:after{
        border-radius: 1px;
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        width: 0;
        height: 20%;
        background: rgba(196, 196, 196, 0.4);
        transition: all .25s;
    }

    span:hover{
        color: #fff;
    }

    span:hover:after{
        margin-top: 5px;
        width: 100%;
    }
</style>
