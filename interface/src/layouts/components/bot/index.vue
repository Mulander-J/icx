<template>
   <div class="fixed right-10 bottom-10 m-5">
      <Auth />
      <div class="liquid-crystal" />
   </div>
</template>
<script lang="ts" setup>
import { onMounted, defineComponent } from 'vue'
import LiquidCrystal from './liquidCrystal'
import Auth from '../Auth.vue'
defineComponent({Auth})
onMounted(()=>{
  const liquidCrystal = new LiquidCrystal(".liquid-crystal", false);
  liquidCrystal.init();
})
</script>
<style>
.liquid-crystal{
  height: 10em;
  width: 10em;
  /* border-radius: 100%;
  box-shadow: inset 0 0 15px 2px #29e784; */
}
</style>