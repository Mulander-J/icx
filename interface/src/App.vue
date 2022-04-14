<template>
  <TheMain />
  <Bot v-if="!isMobile"  class="hidden lg:block fixed right-10 bottom-10 m-5"/>
</template>

<script lang="ts">
import {defineComponent,watch, onBeforeMount} from 'vue'
import { useAppStore } from "@/store/modules/app";
import { updateDark } from '@/utils/dark'
import TheMain from './layouts/TheMain.vue'
import Bot from './layouts/components/bot/index.vue'

export default defineComponent({
  name: "App",
  components: {
    TheMain,
    Bot
  },
  setup() {
    const appStore  = useAppStore()
    watch(()=>appStore.dark,updateDark)
    onBeforeMount(updateDark)
    return {
      isMobile: appStore.isMobile
    }
  },
})
</script>

<style>
</style>
