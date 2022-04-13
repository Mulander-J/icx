<template>
  <div class="flex-col">
    <ul class="grow">
      <router-link v-for="men in menus" :key="men.name" :to="men" custom v-slot="{navigate, isActive, isExactActive}">
        <li class="cursor-pointer" @click="navigate" :class="{active: isActive, exactActive: isExactActive}">{{men.name}}</li>
      </router-link>
    </ul>
    <div>
      <div class="cursor-pointer" v-throttle @click="triggerDark">{{darkTheme}}</div>
      <div>Cycle</div>
      <div>Power</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
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
const darkTheme = computed(()=>appStore.dark)
</script>
<style>
.active{
  background: blue;
}
.exactActive{
  background: orange;
}
</style>