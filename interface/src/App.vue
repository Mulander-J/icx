<template>
  <MyMain />
  <Auth />
</template>

<script lang="ts">
import MyMain from './layouts/Main.vue'
import Auth from "./layouts/components/Auth.vue"

export default {
  name: "App",
  components: {
    MyMain,
    Auth,
  },
}
</script>

<style>
</style>
