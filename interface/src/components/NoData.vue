<template>
    <div class="ctx-center" :class="{'no-data-ab':isFull}">
      <div class="no-data-avatar mb-2"></div>
      <slot>
        <p v-if="!hideText">No Data</p>
      </slot>
    </div>
</template>
<script lang="ts">
export default {
  props:["hideText","isFull"]
}
</script>
<style>
.no-data-ab{
  position: absolute;
  width: 100%;
  height: 80%;
  box-sizing: border-box;
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