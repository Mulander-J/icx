<template>
  <div class="icx-dialog">
    <div class="icxd-mask" v-show="show && !noMask" @click="!noEscMask && $emit('cancelCb')" />
    <transition name="topScale">
      <div class="icxd-body" v-show="show" :style="width ? `max-width:${width}px;` : ''">
        <!-- <div v-if="!!title" class="icxd-title">{{ title }}</div> -->
        <div class="icxd-content">
          <slot>
            {{ content }}
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  // title?: string
  content?: string  
  show: boolean
  width?: number
  noMask?: boolean
  noEscMask?: boolean
}>()
</script>
<style scoped>
.icxd-mask {
  @apply fixed z-50 top-0 bottom-0 left-0 right-0 bg-black/[.3] dark:bg-black/[.6];
}
.icxd-body {
  @apply fixed top-1/2 left-1/2 p-4 text-center rounded-lg flex items-center justify-center;
  transform: translate(-50%, -50%) scale(1);
  z-index: 1000;
  width: 82%;
  max-width: 500px;
  min-height: 13.25rem;
  box-shadow: 0px 8px 16px rgba(2, 12, 26, 0.86);
}
.icxd-content{
  @apply relative rounded-lg overflow-hidden w-full;
}
</style>
