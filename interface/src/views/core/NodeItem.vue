<template>
  <section class="node-card">
    <div class="node-cover">
      <div class="cover-avatar bg-main"></div>
    </div>
    <div class="snow" v-if="item?.base?.isRoot">
      <v-icon name="io-snow"  animation='spin' hover />
    </div>
    <div class="node-text">
      <p class="text-md lg:text-3xl font-bold ">{{item?.main?.title || '◉◡◉'}}</p>
      <p class="text-xs">{{item?.main?.desc || '◉◡◉'}}</p>
      <p class="text-sm">{{item?.main?.content||'◉◡◉'}}</p>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  props:['item']
}
</script>
<style scoped>
.node-card{
  @apply grid md:grid-cols-3 grid-cols-2 gap-x-4 items-center rounded-lg bg-white/[.3] dark:bg-black/[.3] p-2 relative cursor-pointer;
  max-width: 20em;
}
.node-card::after{
  @apply rounded-lg absolute w-full h-full bg-white/[.2] dark:bg-black/[.2] top-2 left-2;
  z-index: -1;
  content: '';
  transition: all .3s ease;
}
.node-card:hover.node-card::after{
  @apply -top-2 -left-2;
}
.snow{
  @apply absolute -top-2 right-2;
}
.node-text{
  @apply md:col-span-2;
}
.node-text p{
  @apply break-all truncate;
}
.node-cover{
  @apply bg-white/[.3] rounded-lg p-2 flex justify-center items-center;
}
.cover-avatar{  
  mask-image: url('/img/dfinity.svg');
  mask-position: 50% bottom;
  mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  height: 3em;
  width: 100%;
}
</style>