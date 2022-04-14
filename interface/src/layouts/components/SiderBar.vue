<template>
  <div class="flex-col">
    <ul class="grow">
      <router-link v-for="men in menus" :key="men.name" :to="men" custom v-slot="{navigate, isActive, isExactActive}">
        <li class="navItem" @click="navigate" :class="{exactActive: isExactActive}">          
          <v-icon :name="men?.meta?.icon || 'ci-icp'" />
        </li>
      </router-link>
    </ul>
    <div class="flex flex-col items-center justify-center">
      <div class="btmBtn" v-throttle @click="triggerDark">
        <transition name="slide" mode="out-in">
          <v-icon v-if="appStore.getIsDark" name="bi-moon-stars" />
          <v-icon v-else name="bi-sun" />
        </transition>
      </div>
      <v-icon class="btmBtn" name="md-batterychargingfull-outlined" />
      <v-icon class="btmBtn" name="io-power" />
    </div>
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
</script>
<style>
.navItem{
  @apply cursor-pointer rounded-lg mb-2 py-1 bg-slate-400/[.4] text-center hover:bg-slate-300/[.4]
}
.exactActive{
  @apply bg-sky-400 hover:bg-sky-300/[.6];
}
.btmBtn{
  @apply cursor-pointer mt-2
}
</style>