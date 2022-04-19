<template>
  <div class="heart-shape" :style="varL"></div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps<{
  l?: string,
  c?:string
}>()
const varL:any = computed(()=>{
  let res = {'--l':'2,5em','--c':'#fff'}
  props.l && (res['--l'] = props.l)
  props.c && (res['--c'] = props.c)
  return res
})
</script>
<style scoped>
.heart-shape{
	position: relative;
  --l:2.5em;
  --c:#fff;
	width: var(--l);
	height: var(--l);
	-webkit-transform: rotate(45deg);
	-moz-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	-o-transform: rotate(45deg);
	transform: rotate(45deg);
	background-color: var(--c);
}
.heart-shape:before,
.heart-shape:after{
	position: absolute;
	width: var(--l);
	height: var(--l);
	content: '';
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	-o-border-radius: 50%;
	border-radius: 50%;
	background-color: var(--c);
}
.heart-shape:before{
	bottom: 0px;
	left: calc(var(--l) / -2);
}
.heart-shape:after{
	top: calc(var(--l) / -2);
	right: 0px;
}
</style>