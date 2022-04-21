<template>
  <transition name="fade" mode="out-in">
    <div v-show="loading" class="font-pixie">
      <div class="loading-img"></div>
      <slot></slot>
    </div>
  </transition>
</template>
<script lang="ts">
export default {
  props:['loading']
}
</script>
<style scoped>
.loading-img{
  @apply w-20 h-20 my-2 mx-auto bg-no-repeat bg-contain bg-center;
  background-image: url('/img/human.gif');
}
</style>