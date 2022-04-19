<template>
  <div class="main-warpper lg:app-h">
    <SiderBar class="main-bg main-sider" />
    <div class="main-bg main-ctx">      
      <main ref="mainCtx" class="grow overflow-y-auto" @scroll="onScroll">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <NavBar class="lg:hidden" />
    </div>
    <MyBot v-if="showBot"  class="main-bot"/>
  </div>
</template>
<script lang="ts" setup>
import { watch, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import SiderBar from './components/SiderBar.vue'
import NavBar from './components/NavBar.vue'
import MyBot from './components/bot/index.vue'

const props = defineProps({
  showBot: Boolean
})
const { proxy } = getCurrentInstance() as any
const route = useRoute()

watch(()=>route,()=>{
  try{
    proxy.$refs['mainCtx'].scrollTop = 0
    proxy.$refs['mainCtx'].scrollLeft = 0
  }catch{}
},{deep:true})

const onScroll = ()=>{  
  const ay = proxy.$refs?.['mainCtx']?.scrollTop || 0
  if(ay>100){
    proxy.$refs['mainCtx'].classList.add('main-above')
  }else{
    proxy.$refs['mainCtx'].classList.remove('main-above')
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
  @apply grow rounded-none lg:rounded-lg ml-0 lg:ml-1 flex flex-col h-full overflow-hidden;
}
.main-bot{
  @apply hidden lg:flex fixed right-10 bottom-10;
  min-height: 20em;
}
</style>