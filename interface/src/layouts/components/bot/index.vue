<template>
   <div class="bot-2r">
      <transition tag="div" mode="out-in" name="fade">
        <div class="bot-loading" v-if="appStore.getIsLoading" key="loading">
          <img class="w-20 h-20 my-2 mx-auto" src="img/human.gif" alt="">
          <p>Loading...({{appStore.icCalls}})</p>
        </div>
        <transition-group class="bot-2r" v-else tag="div" name="slide" mode="out-in">
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
      </transition>
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
.bot-2r{
  @apply flex flex-col items-end
}
.liquid-crystal {
  @apply cursor-pointer rounded-full;
  height: 10em;
  width: 10em;
}
.bot-loading{
  @apply text-center;
  width: 10em;
}
.notifyer{
  @apply rounded-md p-2 pr-8 my-2 text-right select-none break-words relative w-max;
  max-width: 10em;
  background: rgba(0,0,0,.2);
  font-size: calc(6px + 2vmin);
}
.notify-del{
  @apply cursor-pointer absolute top-1/2 right-2;
  transform: translateY(-50%);
}
.notify-auth{
  @apply text-green-500 pr-2 cursor-pointer hover:bg-green-500/[.5] hover:text-gray-200
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