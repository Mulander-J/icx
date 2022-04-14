<template>
   <div class="overflow-hidden">
    <transition-group name="slide" mode="in-out">
        <div class="text-center" v-if="appStore.getIsLoading" key="loading">
          <img class="w-20 h-20 my-2 mx-auto" src="img/human.gif" alt="">
          <p>Loading...</p>
        </div>
        <div v-else>
          <transition-group name="slide" mode="out-in">
            <div class="notifyer" :class="getNotifyCls(ms.type)" v-for="ms in msgList" :key="ms.key">
              {{ms.text}}
              <v-icon 
                class="notify-del" 
                v-if="ms.type > 0" 
                name="io-close"
                @click="appStore.removeMsg(ms.key)" 
              />
            </div>
          </transition-group>
        </div>
      </transition-group>     
      <div class="liquid-crystal" />
   </div>
</template>
<script lang="ts" setup>
import { onMounted,computed } from 'vue'
import { useAppStore } from "@/store/modules/app"
import { useAuthStore } from "@/store/modules/auth"
import { MessageType } from '@/model/msg';
import LiquidCrystal from './liquidCrystal'

const appStore = useAppStore()
const authStore = useAuthStore()

const getNotifyCls = (type:number)=>{
  return `notify-`+ (
    type in MessageType ? ["auth","info","warn","error"]?.[type] : "auth"
  )
}

const msgList = computed(()=>{
    if(!authStore.signedIn){
      return appStore.icMsgs.slice(-4).concat([{
        key: "auth",
        text: 'Sign In',
        type: MessageType.AUTH
      }])
    }
    return appStore.icMsgs
})

onMounted(()=>{
  const liquidCrystal = new LiquidCrystal(".liquid-crystal", false);
  liquidCrystal.init();
  authStore.initAuth();
})
</script>
<style>
.liquid-crystal {
  @apply cursor-pointer rounded-full;
  height: 10em;
  width: 10em;
}
.notifyer{
  @apply rounded-md py-1 px-6 my-2 max-w-lg text-center select-none relative;
  background: rgba(0,0,0,.2);
  font-size: calc(6px + 2vmin);
}
.notify-del{
  @apply cursor-pointer absolute top-1/2 right-2;
  transform: scale(0) translateY(-50%) rotate(0);
}
.notifyer:hover .notify-del{
  transform: scale(1) translateY(-50%) rotate(180deg);
}
.notify-auth{
  @apply text-green-500 cursor-pointer hover:bg-green-500/[.5] hover:text-gray-200
}
.notify-info{
  @apply text-blue-500
}
.notify-warn{
  @apply text-amber-500
}
.notify-error{
  @apply text-rose-500
}
</style>