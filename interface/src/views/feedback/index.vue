<template>
  <div class="min-h-full relative">
    <div class="p-header">
      <div class="ph-box">
        <h2 class="pix-h2">FEEDBACK</h2>
        <div class="flex">
          <input class="slate-widget form-widget dn-text px-2" type="text" placeholder="Search" v-model="_query">
          <rt-btn class="mx-2" icon="io-search" :loading="_loading" v-throttle @click="initPagination" />
          <rt-btn v-if="appStore.getIsOnline" icon="md-add-round" :loading="_loading" v-throttle @click="goCreate" />
        </div>
      </div>
    </div>
    <data-view 
      :count="total" 
      :isFull="true" :isEnd="_isEnd" 
      :isError="_isError" :isEmpty="_isEmpty" 
      @retry="initPagination" @create="goCreate" @nextPage="nextPage"
    >
      <template v-slot:default>
        <ul v-if="!_isEmpty" class="p-body">
          <li class="my-4" v-for="(l,i) in list" :key="i">
            <p class="text-zinc-400 mb-2 text-sm indent-1">{{$filters.dateStr(l.timestamp)}}</p>
            <section class="log-item">
              <p><span class="font-extrabold" :class="[`wt-${l.group||'suggestion'}`]"><v-icon name="ci-icp"/>#{{l.group}}</span></p>
              <p>
                <label>Content:</label>
                <span>{{l.message}}</span>
              </p>         
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
import { onBeforeMount,ref } from 'vue'
import { useRouter } from 'vue-router'
import { InsICXFactory } from "@/hooks/useCanister"
import { FeedbackBody } from '@/hooks/canisters/ICXFactory/type'
import { useAppStore } from '@/store/modules/app'
import usePagination from '@/hooks/usePagination'

const router = useRouter()
const appStore = useAppStore()

const _query = ref('')

const {
  _isError,_isEmpty, _isEnd,
  _loading,list,total,
  initPagination,nextPage,
} = usePagination<FeedbackBody>({
  name:'PageFeedback',
  cmd:InsICXFactory.PageFeedback,
})

const goCreate = ()=>{  
  router.push('/feedback/create')
}

onBeforeMount(()=>{
  initPagination()
})
</script>
<style scoped>
.log-item{
  @apply p-4 rounded-xl grid gap-y-2 bg-gradient-to-r from-white/[.3] dark:from-black/[.3];
}
.wt-bug{
  @apply text-rose-700
}
.wt-suggestion{
  @apply text-lime-400
}
.wt-feature{
  @apply text-amber-400
}
</style>