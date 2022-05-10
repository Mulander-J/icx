<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { wait } from '@/utils'
import Dialog from '@/components/Dialog.vue'

const emits = defineEmits(['closed']);

const _data = [
  '#29ABE2',
  '#F15A24',
  '#ED1E79',
  '#FBB03B'
]

const _target = _data[Math.round(Math.random()*(_data.length-1))]

const _show = ref(false)

const _isWrong = ref('')

const handlePass = async (_d:any)=>{
  _isWrong.value = ''
  if(_target === _d){
    _show.value = false
    await wait(1800)
    emits('closed',true)
  }else{
    _isWrong.value = _d
  }
}

const handleClose = async ()=>{
  _show.value = false
  await wait(1800)
  emits('closed', false)
}

onMounted(()=>{
  _show.value = true
})

</script>
<template>
  <Dialog :show="_show" @cancelCb="handleClose">
    <div class="grid gap-y-4 text-left">
      <p class="mb-4 text-2xl">Prove you are human</p>
      <p>Please click the <strong :style="{color:_target}">Ball with this color</strong> to proceed.</p>
      <p v-show="_isWrong" class="font-bold" :style="{color:_isWrong}">Gotcha, you evil robot! Dare you try me again. 👊</p>
      <div class="ballWrap">
        <div class="balls">
          <div class="ball" v-for="(b,i) in _data" :key="i" @click="handlePass(b)"></div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<style scoped>
.ballWrap{
  @apply relative mx-auto my-8;
  overflow: hidden;
  width: min(300px, 60vw);
  height: min(300px, 60vw);
  border-radius: 100%;
}
.ballWrap::before {
  content: '';
  position: absolute;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: conic-gradient(transparent, #FBB03B, #F15A24,#ED1E79,#522785,#29ABE2);
  animation: rotate 4s linear infinite;
}
.dark .ballWrap::before{
  background-image: conic-gradient(transparent, #FBB03B, #F15A24,#ED1E79,#522785,#29ABE2);
}

.ballWrap::after {
  @apply absolute bg-white dark:bg-black;
  content: '';
  border-radius: 100%;
  left: 6px;
  top: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
}

@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}
@keyframes scale {
  0%,100%{
    transform: scale(1);
  }
  50%{
    transform: scale(1.2);
  }
}
.balls{
  @apply z-10 absolute top-0 left-0 w-full h-full;  
  animation: rotate 8s linear infinite reverse;
}

.ball{
  position: absolute;
  height: 25%;
  width: 25%;
  border-radius: 100%;
  cursor: pointer;
  transition: all .38s ease-in-out;
  animation: scale 4s linear infinite;
}
.ball:nth-child(1){
  top: 20%;
  left: 20%;
  background-image: radial-gradient(at right bottom,rgba(255,255,255,.8),#29ABE2,#522785);
  animation-delay: 0s;
}
.ball:nth-child(2){
  top: 20%;
  right: 20%;
  background-image: radial-gradient(at left bottom,rgba(255,255,255,.8),#F15A24,#ED1E79);
  animation-delay: 1s;
}
.ball:nth-child(3){
  bottom: 20%;
  left: 20%;
  background-image: radial-gradient(at right top,rgba(255,255,255,.8),#ED1E79,#522785);
  animation-delay: 2s;
}
.ball:nth-child(4){
  bottom: 20%;
  right: 20%;
  background-image: radial-gradient(at left top,rgba(255,255,255,.8),#FBB03B,#F15A24);     
  animation-delay: 3s;
}
</style>