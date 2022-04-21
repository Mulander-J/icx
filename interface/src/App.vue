<template>
  <TheMain :showBot="!appStore.isMobile"/>
  <Loading class="app-loading" :loading="appStore.getIsLoading">
    <p class="pix-h2">LOADING...[{{appStore.icCalls}}]</p>
  </Loading>
</template>

<script lang="ts" setup>
import { watch, onBeforeUnmount, onBeforeMount, onMounted } from 'vue'
import { useAppStore } from "@/store/modules/app";
import { useAuthStore } from "@/store/modules/auth"
import { updateDark } from '@/utils/dark'
import { updatePower } from '@/utils/power'
import { throttle } from '@/utils'
import useFakeAI from '@/hooks/useFakeAI'
import TheMain from './layouts/TheMain.vue'
import Loading from './layouts/Loading.vue';


const appStore = useAppStore()
const { initAuth } = useAuthStore()
const { handleGlobalClick } = useFakeAI()

const onresize = throttle(() => {
  appStore.setIsMobile(window.innerWidth <= 1024)
}, 300)


watch(()=>appStore.dark,updateDark)
watch(()=>appStore.isOnChain,updatePower)

onBeforeMount(()=>{
  appStore.initialPower()
  updatePower()
  appStore.initialDark()
  updateDark()
})

onMounted(async ()=>{
  window.addEventListener("click", handleGlobalClick)
  window.addEventListener("resize", onresize)
  await appStore.getAppNode()
  initAuth()
})

onBeforeUnmount(()=>{
  window.removeEventListener("click", handleGlobalClick)
  window.removeEventListener("resize", onresize)
})

</script>
<style>
.app-loading{
  @apply fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center;
  z-index: 8000;
  background: radial-gradient(rgba(221,187,187,.4), transparent);
}
</style>
