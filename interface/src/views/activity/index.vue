<template>
  <div class="p-5 font-sc min-h-full relative">
    <div class="bg-sky-500 left-5 top-5 bottom-5 w-1 absolute rounded-lg" />
    <rt-btn v-throttle :loading="appStore.getIsLoading" @click="getList" />
    <ul class="pl-5">
      <li v-for="(l,i) in _logs" :key="i">
        <div>
          {{l.content}}|level:{{$filters.frBN(l.level)}}|time:{{$filters.mtkTime(l.timestamp)}}
          {{l.work}}{{l.ref}}{{l.opreator}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount,ref } from 'vue'
import { useAppStore } from "@/store/modules/app"
import { InsICXFactory } from "@/hooks/useCanister"
import { WorkEvent } from '@/hooks/canisters/ICXFactory/type'

const appStore = useAppStore()
const _logs = ref<WorkEvent[]>([])

const getList = async ()=>{
  if(appStore.getIsLoading) return
  await appStore.handleCall(
    "WorkEvents",
    InsICXFactory.WorkEvents,
    (res:any)=>{_logs.value = res},
    ()=>{_logs.value = []}
  )
}

onBeforeMount(()=>{
  getList()
})
</script>