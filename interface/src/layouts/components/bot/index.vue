<template>
   <div class="bot-wrapper">
      <NotifyList />
      <div class="liquid-crystal"/>
   </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import NotifyList from './NotifyList.vue';
import LiquidCrystal from './liquidCrystal'

onMounted(()=>{
  const liquidCrystal = new LiquidCrystal(".liquid-crystal", false);
  liquidCrystal.init();
})
</script>
<style>
.bot-wrapper{
  @apply flex flex-col items-center justify-end overflow-hidden rounded-lg;
  width: 14em;
}
.bot-wrapper::after{
  content: '';
  position: absolute;
  z-index: -1;
  background: transparent;
  width: 40em;
  height: 40em;
  bottom: -20em;
  left: 0;
  border-radius: 100%;
}
.bot-wrapper:hover.bot-wrapper::after{
  background: radial-gradient(#201d32, transparent);
}
.liquid-crystal {
  height: 10em;
  width: 10em;
}
</style>