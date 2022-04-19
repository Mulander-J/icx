<template>
  <div class="p-5 min-h-full relative">
     <div class="p-header">
      <div class="ph-box">
        <h2 class="pix-h2">RANK ~ {{total}}</h2>
        <div class="flex">
          <input 
            class="slate-widget form-widget dn-text px-2" 
            type="text" placeholder="Search Principal" 
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
      <ul class="grid grid-cols-1 gap-y-4 my-4" v-if="!_isEmpty">
        <li class="userCard" v-for="(l,i) in list" :key="i">
            <div class="user-avatar"></div>
            <div class="flex flex-col h-full justify-evenly">
              <p class="text-zinc-900 dark:text-zinc-400">{{l.alias}}</p>
              <p>
                <strong class="text-amber-200 dark:text-amber-300 text-2xl mr-2">{{l.point}}</strong>
                <span class="text-sm">Point</span>
              </p>
            </div>
            <div class="cursor-pointer z-20" title="SEND" v-throttle @click="tryCallUser(l)" >
              <v-icon name="md-send-round" hover animation="flash" />
            </div>
        </li>
      </ul>
    </data-view>
    <DialogVue :show="_dialogOpt.isShow" @cancelCb="tryCallUser(null)">
      <UserProfile :user="_dialogOpt.data" />
    </DialogVue>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount,ref } from 'vue'
import usePagination from '@/hooks/usePagination'
import { InsICX } from "@/hooks/useCanister"
import { UserInfo } from '@/hooks/canisters/ICX/type'
import { isPrincipal } from '@/utils/filter'
import DialogVue from '@/components/Dialog.vue'
import UserProfile from './UserProfile.vue'

const _query = ref('')
const _dialogOpt = ref<any>({
  isShow:false,
  data:null
})

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

const tryCallUser = (user:any)=>{
  if(!user){
    _dialogOpt.value.isShow = false
    _dialogOpt.value.data = null
  }else{
    _dialogOpt.value.data = {...user}
    _dialogOpt.value.isShow = true
  }
}


onBeforeMount(()=>{
  initPagination()
})
</script>
<style scoped>
.userCard{
  @apply bg-gradient-to-r from-white/[.3] dark:from-black/[.3] grid grid-cols-3 items-center justify-center text-center p-4 rounded-lg;
}
.user-avatar{
  @apply w-20 h-20 rounded-full bg-slate-200/[.4];
  background-image: url('/img/dfinity.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>