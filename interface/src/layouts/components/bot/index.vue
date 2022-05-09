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
  @apply flex flex-col items-center justify-end rounded-lg;
  width: 12em;
}
.liquid-crystal {
  height: 10em;
  width: 10em;
  overflow: hidden;
  position: relative;
}
.liquid-crystal::after{
  content: '';
  position: absolute;
  z-index: -1;
  background: transparent;
  width: 10em;
  height: 10em;
  bottom: 0em;
  left: 0;
  border-radius: 100%;
}
</style>