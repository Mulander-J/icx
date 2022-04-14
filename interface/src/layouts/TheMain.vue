<template>
  <div class="overflow-clip blur-14 flex m-0 lg:m-10 h-screen lg:app-h">
    <SiderBar class="bg-gray-800/[.4] p-2 w-20 rounded-lg hidden lg:flex" />
    <perfect-scrollbar class="bg-gray-800/[.4] grow rounded-none lg:rounded-lg ml-0 lg:ml-1">
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
<script lang="ts">
import SiderBar from './components/SiderBar.vue'
import NavBar from './components/NavBar.vue'
export default {
  name: "TheMain",
  components: {
    SiderBar,
    NavBar,
  },
}
</script>