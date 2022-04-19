<template>
  <div class="min-h-full relative">
    <div class="p-header">
      <div class="ph-box">
        <h2 class="pix-h2">HOME</h2>
        <div class="flex">
          <input class="slate-widget form-widget dn-text px-2" type="text" placeholder="Search" v-model="_query">
          <rt-btn class="mx-2" icon="io-search" :loading="_loading" v-throttle @click="queryList" />
          <rt-btn icon="md-add-round" :loading="_loading" v-throttle @click="goCreate" />
        </div>
      </div>
    </div>
    <data-view 
      :count="_total"
      :isFull="true" :hidePageNext="true"
      :isError="_isError" :isEmpty="_isEmpty" 
      :retry="initPagination" :create="goCreate"
    >
      <template v-slot:default>
        <ul v-if="!_isEmpty" class="p-body">
          <NodeGroup v-if="appStore.isAppFetched" title="APP" :list="[appStore.appInfo]" />
          <NodeGroup v-if="listTrans?.out?.length > 0" title="#" />
          <NodeGroup 
            class="my-4" 
            v-for="(_l,_k,i) in listTrans.alpha" :key="i"
            :title="_k" :list="_l"
          />
        </ul>
      </template>
    </data-view>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { isAlphabet } from '@/utils'
import { InsICX } from "@/hooks/useCanister"
import { Node as typeNode } from '@/hooks/canisters/ICX/type'
import { useAppStore } from '@/store/modules/app'
import useList from '@/hooks/useList'
import NodeGroup from './NodeGroup.vue'

const router = useRouter()
const appStore = useAppStore()

const _query = ref('')

const _appNode = ref<typeNode[]>([])

const listTrans = computed(()=>{ 
  let _resAlphabet:any = {};
  let _outFilter:any = []
  if(list.value.length>0){
    list.value.forEach((item:typeNode)=>{
      let k = isAlphabet(item.main.title)
      if(!!k){
         (_resAlphabet[k] ? _resAlphabet[k]: _resAlphabet[k] = [])  && _resAlphabet[k].push(item)
      }else{
        _outFilter.push(item)
      }
    })
  }
  return {
    alpha:_resAlphabet,
    out: _outFilter
  }
})

const {
  _isError,_isEmpty,
  _loading,_total,list,
  queryList,initPagination,
} = useList<typeNode>({
  name:'L2Nodes',
  cmd:InsICX.L2Nodes,
})

const goCreate = ()=>{
  router.push('/add')
}

onBeforeMount(()=>{
  initPagination()
})
</script>
<style>
.log-item{
  @apply p-4 rounded-xl bg-white/40 grid gap-y-2
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