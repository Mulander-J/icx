<template>
  <div>
    <div class="m-5 flex items-center">
      <span class="pix-h2">INFO</span>
      <rt-btn class="ml-2" title="Back To List" icon="ri-arrow-go-back-line" v-throttle @click="$router.push('/list')" />
      <rt-btn v-show="appStore.getIsOnline" class="mx-2" title="Create" icon="md-add-round" v-throttle @click="goCreate" />
      <rt-btn v-show="appStore.getIsOnline" class="mr-2" title="Modify" icon="md-modeedit-round" v-throttle @click="goModify(_item)" />
      <rt-btn v-if="!_isRoot&&appStore.getIsOnline" :hover="true" title="Delete" icon="io-trash-bin" v-throttle @click="handleDelete(_item)" />
      <a :href="share_twitter" target="_blank" class="ml-2">
        <v-icon name="ri-share-fill" color="rgb(29, 155, 240)"/>
      </a>
    </div>
    <div class="item-card">
      <div class="flex items-start flex-wrap">
        <div class="item-cover"><div class="item-img bg-main"></div></div>
        <div class="px-4">
          <p class="text-3xl font-bold">{{_item?.main?.title || '◉◡◉'}}</p>
          <p class="text-xs text-zinc-800/[.8]">{{_item?.main?.desc || '◉◡◉'}}</p>
        </div>        
      </div>
      <p class="text-xl my-2">{{_item?.main?.content||'◉◡◉'}}</p>
      <div v-show="appStore.getIsOnline">
        <p class="text-sm">Participating Editors : <strong>{{_joinCount}}</strong></p>                
        <p class="text-sm">Last Update at {{$filters.dateStr(_item?.lastUpdate||0)}}</p>
      </div>     
    </div>
    <data-view
      v-if="!_isRoot"
      :count="_total"
      :isFull="true" :hidePageNext="true"
      :isError="_isError" :isEmpty="_isEmpty"       
      @retry="initPagination" @create="goCreate"
    >
      <template v-slot:default>
        <ul v-if="!_isEmpty" class="p-body info-ul">
            <li class="bookmark-wrap" v-for="(l,i) in list" :key="i">
              <div>                
                <a 
                  v-if="okHref(l?.main?.content)" 
                  class="txt-main markLink" 
                  :href="l?.main?.content"
                  target="_blank" rel="noopener noreferrer"
                >{{l?.main?.title || 'Link'}}</a>
                <span class="txt-main markLink" v-else>{{l?.main?.title || 'Link'}}</span>
                <p class="text-sm" v-if="l?.main?.desc">{{l.main.desc}}</p>
              </div>
              <div v-if="appStore.getIsOnline" class="flex">
                  <rt-btn class="mx-2" title="Modify" icon="md-modeedit-round" v-throttle @click="goModify(l)" />
                  <rt-btn :hover="true" title="Delete" icon="io-trash-bin" v-throttle @click="handleDelete(l)" />
              </div>
            </li>
        </ul>
      </template>
    </data-view>
    <no-data v-else class="m-5 mt-12 text-center">
      <p class="font-sc text-sky-500">The app-info is open for modify.</p>      
      <div v-show="appStore.getIsOnline" class="btn-modify" @click="goModify(_item)">MODIFY</div>
    </no-data>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, computed  } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { useAuthStore } from '@/store/modules/auth'
import { getInsICX, InsICX } from "@/hooks/useCanister"
import { Node as typeNode } from '@/hooks/canisters/ICX/type'
import useList from '@/hooks/useList'
import { okHref } from '@/utils'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()

const _id = ref(0)
const _item = ref<typeNode|null>(null)
const _isRoot = computed(()=> _item.value?.base?.isRoot || false)
const _joinCount = computed(()=>_item.value?.authors?.length || 0)

const share_twitter = computed(()=>{
  const url = encodeURIComponent(window.location.href)
  const ctx = encodeURIComponent('People of the Metaverse, I am now fighting an evil creature, fighting to defend the Earth, I need your strength, please raise your hands, give me some energy!')
  return `https://twitter.com/share?text=${ctx}&url=${url}&hashtags=icx`
})

const {
  _isError,_isEmpty,
  _total,list,
  initPagination,
} = useList<typeNode>({
  name:'NodeByPid',
  cmd:InsICX.NodeByPid,
},()=>([_id.value]))

const skipBack = ()=>{
  router.push('/404')
}
const goCreate = ()=>{
  const id = Number(_item.value?.base?.id)
  id && router.push({
     name:'Create',
     params:{ id }
   })
}
const goModify = (item:any)=>{
  const id = Number(item?.base?.id)
  id && router.push('/edit/'+id)
}

const handleDelete = async (item:any)=>{
  // console.log('delete item',item)
  authStore.addMsg("Not open yet")
  return
  // if(item?.base?.isRoot) return
  // if(!item?.base?.id) return
  // if(authStore.agent){
  //   const actor = getInsICX(authStore.agent)
  //   authStore.handleCall({
  //     name:'removeNode',
  //     cmd:actor.removeNode,
  //     cbk:initialNodes,
  //     rej:()=>{},    
  //   },item.base.id)
  // }
}

const initialNodes = async ()=>{
  await authStore.handleCall({
    name:'NodeById',
    cmd:InsICX.NodeById,
    cbk:async (res:any)=>{
      if(res.length>0){
        _item.value = {...res[0]}
        if(res[0].base.isRoot) {
          appStore.setAppInfo(res[0])
          return false
        }
        await initPagination()
      }else{
        skipBack()
      }
    },
    rej:()=>{
      skipBack()
    },    
  },_id.value)
}

onBeforeMount(()=>{
  const id = Number(route.params.id)
  _id.value = id
  !id && skipBack()
})

onMounted(initialNodes)
</script>
<style scoped>
.item-card{
  @apply m-5 rounded-lg lg:p-4 p-2 relative bg-gradient-to-r from-white/[.3] dark:from-black/[.3];
}
.item-card::after{
  @apply rounded-lg absolute w-full h-full top-2 left-2 bg-gradient-to-r from-white/[.2] dark:from-black/[.2];
  z-index: -1;
  content: '';
}
.item-cover{
  @apply bg-white/[.3] rounded-lg p-2 flex justify-center items-center;
}
.item-img{
  mask-image: url('/img/dfinity.svg');
  mask-position: 50% bottom;
  mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  height: 3em;
  width: 3em;
}
.btn-modify{
  @apply bg-slate-400/[.4] hover:bg-slate-300/[.4] rounded-lg cursor-pointer px-4 py-2 relative mt-8;
}
.bookmark-wrap{
  @apply flex justify-between items-center py-4;
  border-top: 2px solid rgba(255,255,255,.2);
}
.info-ul{
   counter-reset: section;
}
.bookmark-wrap .txt-main::before {
  counter-increment: section;
  content: "#" counter(section) ". ";
}
.markLink{
  @apply cursor-pointer underline underline-offset-2;
}
</style>