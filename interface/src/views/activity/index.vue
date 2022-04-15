<template>
  <div class="p-5 min-h-full relative">
    <div class="bg-zinc-200/[.6] left-5 top-5 bottom-5 w-1 absolute rounded-lg" />
    <rt-btn class="absolute top-5 right-5 z-50" v-throttle :loading="appStore.getIsLoading" @click="getList" />
    <data-view :isFull="true" :isError="_fetchErr" :isEmpty="_isEmpty" :retry="getList">
      <ul class="m-12 ml-4" v-if="!_isEmpty">
        <li class="my-4" v-for="(l,i) in _logs" :key="i">
          <p class="text-zinc-400 mb-2 text-sm indent-1">{{$filters.dateStr(l.timestamp)}}</p>
          <section class="log-item">                  
            <p>            
              <span class="mr-4 font-extrabold" :class="[`wt-${l.work||'update'}`]">
                <v-icon name="ci-icp"/>
                #{{l.work}}
              </span>
              <span>Node.Lv<strong>{{$filters.frBN(l.level)}}</strong></span>
            </p>
            <p v-if="l.content">
              <label>Content:</label>
              <span>{{l.content}}</span>
            </p>
            <p v-if="l.ref">
              <label>Ref:</label>
              <span>{{l.ref}}</span>
            </p>
            <p>
              <label>Opreator:</label>              
              <span>{{$filters.strSlice(l.opreator)}}</span>              
            </p>
          </section>        
        </li>
      </ul>
    </data-view>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount,ref,computed } from 'vue'
import { useAppStore } from "@/store/modules/app"
import { InsICXFactory } from "@/hooks/useCanister"
import { WorkEvent } from '@/hooks/canisters/ICXFactory/type'

const appStore = useAppStore()
const _fetchErr = ref(false)
const _logs = ref<WorkEvent[]>([])
const _isEmpty = computed(()=>_logs.value.length<=0)

const getList = async ()=>{
  if(appStore.getIsLoading) return
  await appStore.handleCall(
    "WorkEvents",
    InsICXFactory.WorkEvents,
    (res:any)=>{
      _fetchErr.value = false
      _logs.value = res
    },
    ()=>{
      _fetchErr.value = true
      _logs.value = []      
    }
  )
}

onBeforeMount(()=>{
  getList()
})
</script>
<style>
.log-item{
  @apply p-4 rounded-xl bg-white/40 grid gap-y-2
}
.wt-delete{
  @apply text-rose-700
}
.wt-create{
  @apply text-lime-400
}
.wt-update{
  @apply text-amber-400
}
.wt-initial{
  @apply text-purple-500
}
</style>