<template>
  <transition name="fade" mode="out-in">
    <div v-show="loading" class="font-pixie">
      <img class="w-20 h-20 my-2 mx-auto" src="img/human.gif" alt="">
      <slot></slot>
    </div>
  </transition>
</template>
<script lang="ts">
export default {
  props:['loading']
}
</script>