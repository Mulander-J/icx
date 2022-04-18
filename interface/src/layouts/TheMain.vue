<template>
  <div class="main-warpper lg:app-h">
    <SiderBar class="main-bg main-sider" />
    <perfect-scrollbar ref="mainCtx" class="main-bg main-ctx" @ps-scroll-y="onScroll">
      <div class="flex flex-col h-full">      
        <main class="grow">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>        
        </main>
        <NavBar class="lg:hidden" />
      </div>
    </perfect-scrollbar>
    <MyBot v-if="showBot"  class="main-bot"/>
  </div>
</template>
<script lang="ts" setup>
import { watch, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import SiderBar from './components/SiderBar.vue'
import NavBar from './components/NavBar.vue'
import MyBot from './components/bot/index.vue'

const props = defineProps({
  showBot: Boolean
})
const { proxy } = getCurrentInstance() as any
const {setOffsetY} = useAppStore()
const route = useRoute()

watch(()=>route,()=>{
  try{
    proxy.$refs['mainCtx'].$el.scrollTop = 0
    proxy.$refs['mainCtx'].$el.scrollLeft = 0
  }catch{}
},{deep:true})

const onScroll = (event:any)=>{
  const ay = proxy.$refs?.['mainCtx']?.ps?.scrollbarYTop || 0
  if(ay>200){
    proxy.$refs['mainCtx'].$el.classList.add('main-above')
  }else{
    proxy.$refs['mainCtx'].$el.classList.remove('main-above')
  }
}
</script>
<style>
.main-warpper{
  @apply overflow-clip flex m-0 lg:m-10 h-screen;
}
.main-bg{
  @apply bg-gray-800/[.4] dark:bg-gray-800/[.8];
}
.main-sider{
  @apply p-2 w-20 rounded-lg hidden lg:flex;
}
.main-ctx{
  @apply grow rounded-none lg:rounded-lg ml-0 lg:ml-1;
}
.main-bot{
  @apply hidden lg:flex fixed right-10 bottom-10 top-60;
}
</style>