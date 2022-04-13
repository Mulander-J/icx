<template>
  <TheMain />
  <Auth />
</template>

<script lang="ts">
import {defineComponent,watch, onBeforeMount} from 'vue'
import { useAppStore } from "@/store/modules/app";
import { updateDark } from '@/utils/dark'
import TheMain from './layouts/TheMain.vue'
import Auth from "./layouts/components/Auth.vue"

export default defineComponent({
  name: "App",
  components: {
    TheMain,
    Auth,
  },
  setup() {
    const appStore  = useAppStore()
    watch(()=>appStore.dark,updateDark)
    onBeforeMount(updateDark)
  },
})
</script>

<style>
</style>
