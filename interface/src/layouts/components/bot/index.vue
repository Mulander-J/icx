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
  @apply flex flex-col items-center justify-end overflow-hidden;
  width: 14em;
}
.liquid-crystal {
  height: 10em;
  width: 10em;
}
.signBtn{
  margin: 0 auto;
  text-align: center;
  padding: 0.4rem 0.6rem;
  background: rgba(255,255,255,.8);
  border-radius: 12px;
}
</style>