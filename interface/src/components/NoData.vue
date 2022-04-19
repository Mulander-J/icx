<template>
    <div class="ctx-center" :class="{'no-data-ab':isFull}">
      <div class="no-data-avatar"></div>
      <div class="pix-h2 mt-4 ctx-center" v-if="!hideText">
        <slot>NO DATA</slot>
      </div>
    </div>
</template>
<script lang="ts">
export default {
  props:["hideText","isFull"]
}
</script>
<style scoped>
.no-data-ab{
  position: absolute;
  width: max-content;
  height: max-content;
  box-sizing: border-box;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
}
.no-data-avatar{
  mask-image: url('/img/dfinity-lx.svg');
  mask-position: 50% bottom;
  mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: contain;
  background-color: rgba(19, 17, 17,.6);
  min-height: 5em;
  min-width: 10em;
}
</style>