<template>
  <div class="p-5 min-h-full relative">
     <div class="p-header">
      <div class="ph-box">
        <h2 class="pix-h2">RANK ~ {{total}}</h2>
        <div class="flex">
          <input 
            class="slate-widget form-widget dn-text px-2" 
            type="text" placeholder="Search" 
            v-model.trim="_query"
          >
          <rt-btn class="mx-2" icon="io-search" :loading="_loading" v-throttle @click="initPagination" />
        </div>
      </div>
    </div>
    <data-view 
      :count="list.length" 
      :isFull="true" :hideCreate="true" 
      :isEnd="_isEnd" :isError="_isError" :isEmpty="_isEmpty" 
      :retry="initPagination" :nextPage="nextPage"
    >
      <ul class="lg:flex lg:flex-wrap grid grid-cols-2" v-if="!_isEmpty">
        <li class="userCard" v-for="(l,i) in list" :key="i">          
          <div class="user-index">#{{l.no}}</div>
            <div class="user-avatar"></div>
            <p class="text-bolder text-4xl text-center mt-2">{{l.point}}</p>
            <div class="user-actions">
              <div class="cursor-pointer" v-copy="{ctx:l.id}" title="COPY">
                <v-icon name="io-copy"/>
              </div>
              <a class="cursor-pointer" title="EXPLOR" :href="$filters.accountExplor(l.id)" targer="_blank">
                <v-icon name="oi-link-external"/>
              </a>
            </div>                
        </li>
      </ul>
    </data-view>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount,ref } from 'vue'
import usePagination from '@/hooks/usePagination'
import { InsICX } from "@/hooks/useCanister"
import { UserInfo } from '@/hooks/canisters/ICX/type'
import { isPrincipal } from '@/utils/filter'

const _query = ref('')

const {
  _isError,_isEmpty, _isEnd,
  _loading,list,total,
  initPagination,nextPage,
} = usePagination<UserInfo>({
  name:'PageUser',
  cmd:InsICX.PageUser,
},({pageSize,pageNum,setErr})=>{
  let querys:any = []
  if(!!_query.value){
    if(isPrincipal(_query.value)){
      querys = [_query.value]
    }else{
      setErr("Invalid Principal")
      return null
    }
  }
  return [pageSize,pageNum,querys]
})


onBeforeMount(()=>{
  initPagination()
})
</script>
<style>
.userCard{
  @apply relative p-4 bg-slate-200/[.5] rounded-xl w-max my-8 lg:mx-4 mx-auto gap-4;
}
.user-index{
  @apply absolute px-2 -top-2 -left-2 dark:bg-sky-600 bg-sky-400 rounded-lg;
}
.user-actions{
  @apply grid grid-cols-2 gap-x-2 pt-4 text-center justify-center mx-auto rounded-b-xl;  
}
.user-avatar{
  @apply w-20 h-20 rounded-xl bg-slate-200/[.4];
  background-image: url('/img/dfinity.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>