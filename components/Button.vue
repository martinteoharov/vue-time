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

<style scoped lang='scss'>

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
        transition: all .35s;
    }

    a span {
        position: relative;
        z-index: 2;
    }

    a:after{
        border-radius: 5px;
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        width: 0;
        height: 10%;
        background: rgba(196, 196, 196, 0.6);
        transition: all .25s;
    }

    a:hover{
        color: #fff;
    }

    a:hover:after{
        width: 80%;
        margin-left: 10%;
    }
</style>
