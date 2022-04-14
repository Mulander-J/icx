<template>
  <div class="p-5 font-sc min-h-full relative">
    <button @click="appStore.addCall">+</button>
    <button @click="appStore.removeCall">-</button>
    <div class="bg-sky-500 left-5 top-5 bottom-5 w-1 absolute rounded-lg" />
    <ul class="pl-5">
      <li v-for="(l,i) in _logs" :key="i">
        <div>
          {{l}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useAppStore } from "@/store/modules/app"
import { MessageType } from '@/model/msg';

const appStore = useAppStore()
const _logs = ["#PID  #Delete #Col at #2022","#Delete A #Col at #2022"]

onBeforeMount(()=>{
  // setTimeout(()=>{appStore.addMsg("Errorss", MessageType.ERROR)},1000)
  // setTimeout(()=>{appStore.addMsg("dsdas", MessageType.WARN)},2000)
})
</script>