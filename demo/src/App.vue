<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <span>Comments (<DisqusCount identifier="/blog/1" />): </span>
    <DisqusComments identifier="/blog/1"  />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DisqusCount, DisqusComments } from "../../src";

export default defineComponent({
  name: "App",
  components: { DisqusCount, DisqusComments },
});
</script>

<style>
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: black;
  margin-top: 60px;
}
</style>
