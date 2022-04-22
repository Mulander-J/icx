<template>
  <div class="w-full sticky bottom-0">
    <ul class="h5NavRow">
      <router-link v-for="men in pipeInner" :key="men.name" :to="men" custom v-slot="{navigate, isActive, isExactActive}">
        <li class="h5NavItem" @click="navigate" :class="{exactActive: isExactActive||isActive}">          
          <v-icon :name="men?.meta?.icon || 'ci-icp'" />
          <p class="text-xs">{{men.name}}</p>
        </li>
      </router-link>
      <li class="h5NavItem" @click="dropShow=!dropShow">
        <v-icon name="md-morehoriz" />
        <p class="text-xs">More</p>
      </li>
    </ul>
    <transition name="fade" mode="out-in">
      <ul v-show="dropShow" class="dropNav" @click="dropShow=false">      
        <router-link  v-for="omen in pipeOuter" :key="omen.name" :to="omen" custom v-slot="{navigate, isActive, isExactActive}">
          <li class="dropItem" @click="navigate" :class="{exactActive: isExactActive||isActive}">
            <v-icon :name="omen?.meta?.icon || 'ci-icp'"/>
            <span>{{omen.name}}</span>
          </li>
        </router-link>
        <li class="dropItem"  @click="appStore.triggerDark">                
          <v-icon v-if="appStore.getIsDark" name="bi-moon-stars" />
          <v-icon v-else name="bi-sun" />
          <span>{{appStore.dark}}</span>
        </li>
        <li class="dropItem" v-throttle @click="setDialogShow(true)">
          <v-icon name="ci-icp" />
          <span>Identity</span>
        </li>
        <li class="dropItem" v-throttle @click="appStore.triggerPower">
          <v-icon name="io-power" />
          <span>{{appStore.isOnChain}}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { appRoutes } from '@/router'
import { useAppStore } from "@/store/modules/app"
import { useAuthStore } from "@/store/modules/auth"

const pipeInner = appRoutes.slice(0,3)
const pipeOuter = appRoutes.slice(3)

const appStore  = useAppStore()
const { setDialogShow }  = useAuthStore()

const dropShow = ref(false)

</script>
<style scoped>
.h5NavRow{
  @apply bg-white/[.8] dark:bg-black/[.8]  grid grid-cols-4 py-1 rounded-t-lg items-center justify-items-center;
   z-index: 10001;
}
.h5NavItem{
  @apply rounded-lg text-center capitalize w-full;
  transition: all .3s ease;
}
.online .exactActive{
  @apply text-sky-500 hover:text-sky-500/[.8] !important;
}
.offline .exactActive{
  @apply text-rose-500 hover:text-rose-500/[.8] !important;
}

.dropNav{
  @apply bg-white/[.8] dark:bg-black/[.8] p-2 absolute right-2 bottom-14 rounded-lg;
}
.dropItem{
  @apply p-1 rounded-lg flex items-center my-1 bg-black/[.2] dark:bg-white/[.2];
}
.dropItem span{
  @apply ml-1 capitalize text-xs;
}
</style>