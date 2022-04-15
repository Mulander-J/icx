<template>
  <div class="p-5 min-h-full relative">
    <rt-btn class="absolute top-5 right-5 z-50" :loading="appStore.getIsLoading" v-throttle @click="getList" />
    <div>search bar create refresh</div>
    <data-view :isFull="true" :isError="_fetchErr" :isEmpty="_isEmpty" :retry="getList">
      <template v-slot:default>
        <ul class="m-12 ml-4" v-if="!_isEmpty">
          <li class="my-4" v-for="(l,i) in _fdbks" :key="i">
            <p class="text-zinc-400 mb-2 text-sm indent-1">{{$filters.dateStr(l.timestamp)}}</p>
            <section class="log-item">                  
              <p>
                <label>Opreator:</label>              
                <span>{{$filters.strSlice(l.opreator)}}</span>              
              </p>
            </section>        
          </li>
        </ul>
      </template>
    </data-view>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount,ref,computed } from 'vue'
import { useAppStore } from "@/store/modules/app"
import { InsICXFactory } from "@/hooks/useCanister"
import { FeedbackBody } from '@/hooks/canisters/ICXFactory/type'

const appStore = useAppStore()
const _fetchErr = ref(false)
const _fdbks = ref<FeedbackBody[]>([])
const _isEmpty = computed(()=>_fdbks.value.length<=0)

const getList = async ()=>{
  if(appStore.getIsLoading) return
  await appStore.handleCall(
    "Feedbacks",
    InsICXFactory.Feedbacks,
    (res:any)=>{
      _fetchErr.value = false
      _fdbks.value = res
    },
    ()=>{
      _fetchErr.value = true
      _fdbks.value = []      
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