<template>
  <div class="min-h-full relative">
     <div class="p-header">
      <div class="ph-box">
        <h2 class="pix-h2">ACTIVITY</h2>
        <div class="flex">
          <input class="slate-widget form-widget dn-text px-2" type="text" placeholder="Search">
          <rt-btn class="mx-2" icon="io-search" :loading="_loading" v-throttle @click="initPagination" />
        </div>
      </div>
    </div>
    <data-view 
      :count="total" 
      :isFull="true" :hideCreate="true" 
      :isEnd="_isEnd" :isError="_isError" :isEmpty="_isEmpty" 
      :retry="initPagination" :nextPage="nextPage"
    >
      <ul v-if="!_isEmpty" class="p-body">
        <li class="my-4" v-for="(l,i) in list" :key="i">
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
              <span>
                <a class="text-blue-600 hover:text-blue-600/[.8]" :href="$filters.accountExplor(l.opreator)" target="_blank">{{$filters.strSlice(l.opreator)}}</a>              
              </span>              
            </p>
          </section>        
        </li>
      </ul>
    </data-view>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { InsICXFactory } from "@/hooks/useCanister"
import { WorkEvent } from '@/hooks/canisters/ICXFactory/type'
import usePagination from '@/hooks/usePagination'

const {
  _isError,_isEmpty, _isEnd,
  _loading,list,total,
  initPagination,nextPage,
} = usePagination<WorkEvent>({
  name:'PageWorkEvent',
  cmd:InsICXFactory.PageWorkEvent,
})

onBeforeMount(()=>{
  initPagination()
})
</script>
<style scoped>
.log-item{
  @apply p-4 rounded-xl grid gap-y-2 bg-gradient-to-r from-white/[.3] dark:from-black/[.3];
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