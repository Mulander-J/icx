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
      <li class="slate-widget navItem"  @click="appStore.triggerDark">                
        <transition name="slide" mode="out-in">
          <v-icon v-if="appStore.getIsDark" name="bi-moon-stars" />
          <v-icon v-else name="bi-sun" />
        </transition>
      </li>
      <li class="slate-widget navItem" v-throttle @click="setDialogShow(true)">
        <v-icon name="ci-icp" />
      </li>
      <li class="navItem" v-throttle @click="appStore.triggerPower">
        <v-icon name="io-power" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { appRoutes } from '@/router'
import { useAppStore } from "@/store/modules/app"
import { useAuthStore } from "@/store/modules/auth"

const menus = appRoutes
const appStore  = useAppStore()
const { setDialogShow }  = useAuthStore()
</script>
<style scoped>
.navItem{
  @apply cursor-pointer rounded-lg mb-2 py-1 text-center overflow-hidden
}
.online .exactActive{
  @apply bg-sky-400 hover:bg-sky-400/[.8] !important;
}
.offline .exactActive{
  @apply bg-rose-400 hover:bg-rose-400/[.8] !important;
}
</style>