<template>
  <div class="bg-blue-200">
    <SiderBar class="hidden lg:flex w-20" />
    <div class="flex flex-col grow min-h-screen ml-0 lg:ml-20">
      <MyHeader />
      <main class="grow">
        <router-view />
      </main>      
      <MyFooter class="hidden lg:block" />
      <NavBar class="lg:hidden" />
    </div>
  </div>
</template>
<script lang="ts">
import MyHeader from './components/Header.vue'
import MyFooter from './components/Footer.vue'
import SiderBar from './components/SiderBar.vue'
import NavBar from './components/NavBar.vue'
export default {
  name: "Main",
  components: {
    MyHeader,
    MyFooter,
    SiderBar,
    NavBar,
  },
}
</script>