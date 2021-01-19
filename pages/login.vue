<template>
    <form action="">
        <p> Name: </p>
        <input name='name'/>
        <p> Password: </p>
        <input name='password' type='password'/>
        <button> Submit </button>
    </form>
  
</template>

<script>
export default {

}
</script>

<style>
    form {
        width: 20vw;
        height: 50vh;
        margin-left: auto;
        margin-right: auto;
        margin-top: 25vh;
        border: 1px solid black;
        position: relative;
    }
    form > input {
        margin-left: 10%;
        width: 80%;
    }
    form > p {
        padding: 16px 16px;
    }
    form > button {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 16px 16px;
    }

</style>
