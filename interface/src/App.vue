<template>
  <TheMain :showBot="!appStore.isMobile"/>
  <Loading class="app-loading" :loading="appStore.getIsLoading">
    <p>Loading...({{appStore.icCalls}})</p>
  </Loading>
</template>

<script lang="ts" setup>
import { watch, onBeforeMount } from 'vue'
import { useAppStore } from "@/store/modules/app";
import { useAuthStore } from "@/store/modules/auth"
import { updateDark } from '@/utils/dark'
import TheMain from './layouts/TheMain.vue'
import Loading from './layouts/Loading.vue';


const appStore = useAppStore()
const {initAuth} = useAuthStore()

watch(()=>appStore.dark,updateDark)
onBeforeMount(()=>{
  updateDark()
  initAuth()
})

</script>
<style>
.app-loading{
  @apply fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center;
  z-index: 10000;
  background: radial-gradient(#ddbbbb, transparent);
}
</style>
