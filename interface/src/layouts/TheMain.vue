<template>
  <div class="overflow-clip blur-14 flex m-0 lg:m-10 h-screen lg:app-h">
    <SiderBar class="bg-gray-800/[.4] p-2 w-20 rounded-lg hidden lg:flex" />
    <div class="bg-gray-800/[.4] overflow-auto flex flex-col grow rounded-none lg:rounded-lg ml-0 lg:ml-1">      
      <main class="grow">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <NavBar class="lg:hidden" />
    </div>
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