<template>
  <div class="overflow-hidden relative">
    <span class="dw-hr relative px-4 align-baseline">
      <slot></slot>
    </span>
  </div>
</template>
<style>
.dw-hr::before,
.dw-hr::after{
  content: '';
  display: block;
  width: 1000px;
  position: absolute;
  top: calc(50% - 1px);
  border-top: 2px solid rgba(255,255,255,.3);
}
.dw-hr::before{
  right: 100%;
}
.dw-hr::after{
  left: 100%;
}
</style>