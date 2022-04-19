<template>
  <div class="flex-col">
    <ul class="grow">
      <router-link v-for="men in menus" :key="men.name" :to="men" custom v-slot="{navigate, isActive, isExactActive}">
        <li class="slate-widget navItem" @click="navigate" :class="{exactActive: isExactActive||isActive}">          
          <v-icon :name="men?.meta?.icon || 'ci-icp'" />
        </li>
      </router-link>
    </ul>
    <ul>
      <li class="slate-widget navItem"  @click="triggerDark">                
        <transition name="slide" mode="out-in">
          <v-icon v-if="appStore.getIsDark" name="bi-moon-stars" />
          <v-icon v-else name="bi-sun" />
        </transition>
      </li>
      <li class="navItem" v-throttle @click="triggerOnChain">
        <v-icon name="io-power" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { appRoutes } from '@/router'
import { useAppStore } from "@/store/modules/app"
import { setDark,getDark } from '@/utils/dark'

const appStore  = useAppStore()
const menus = appRoutes
const triggerDark = ()=>{
  const _theme = getDark() === 'dark' ? 'light' : 'dark'
  setDark(_theme)
  appStore.setDark(_theme)
}
const triggerOnChain = ()=>{
  appStore.setIsOnChain(!appStore.isOnChain)
}
</script>
<style>
.navItem{
  @apply cursor-pointer rounded-lg mb-2 py-1 text-center overflow-hidden
}
.exactActive{
  @apply bg-sky-400 hover:bg-sky-400/[.8] !important;
}
</style>