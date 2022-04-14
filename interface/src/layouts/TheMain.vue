<template>
  <div class="main-warpper">
    <SiderBar class="main-bg main-sider" />
    <perfect-scrollbar ref="mainCtx" class="main-bg main-ctx">
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
  </div>
</template>
<script lang="ts" setup>
import { watch, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import SiderBar from './components/SiderBar.vue'
import NavBar from './components/NavBar.vue'

const { proxy } = getCurrentInstance() as any
const route = useRoute()

watch(()=>route,()=>{
  try{
    proxy.$refs['mainCtx'].$el.scrollTop = 0
    proxy.$refs['mainCtx'].$el.scrollLeft = 0
  }catch{}
},{deep:true})
</script>
<style>
.main-warpper{
  @apply overflow-clip flex m-0 lg:m-10 h-screen lg:app-h;
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
</style>