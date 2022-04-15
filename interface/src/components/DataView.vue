<template>
 <transition name="fade" mode="out-in">     
    <no-data v-if="isError" :isFull="isFull">
      <p class="text-rose-500">LOADING ERROR</p>
      <div class="slate-btn w-min mt-6 py-2 px-8 rounded-xl" v-throttle @click="retry">RETRY</div>
    </no-data>
    <no-data v-else-if="isEmpty" :isFull="isFull" />
    <slot v-else></slot>
  </transition>
</template>
<script lang="ts">
 export default {
   props:['isError','isEmpty','isFull','retry']
 }
</script>