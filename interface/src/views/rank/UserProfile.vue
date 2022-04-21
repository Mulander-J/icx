<template>
  <transition name="fade" mode="out-in">
    <div v-if="user" class="userPoster">
      <div class="text-left text-2xl w-full"># {{$filters.frBN(user?.no || 0)}}</div>
      <div class="relative">
        <div class="up-heart"><HeartVue l="2.5em" c="rgba(255,255,255)"/></div>
        <div class="up-avatar-img"></div>
      </div>
      <p class="font-pixie uppercase">{{user?.alias || 'Anonymous'}}</p>
      <p class="text-3xl my-2 font-extrabold">{{user?.point || 0}}</p>
      <div class="ids-row">
        <div>
          <label>Public Key</label>
          <p>{{$filters.strSlice(user?.account || '')}}</p>
        </div>
         <cp-btn class="ids-copy" :txt="user?.account"/>
      </div>
      <div class="ids-row">
        <div>
          <label>Principal Id</label>
          <p>{{$filters.strSlice(user?.id || '')}}</p>
        </div>
        <cp-btn class="ids-copy" :txt="user?.id"/>
      </div>
      <a 
        class="slate-widget btn w-max mt-6 py-2 px-8"
        href="https://6hsbt-vqaaa-aaaaf-aaafq-cai.ic0.app/" target="_blank" rel="nofollow noopener"
      >Chat with me</a>
    </div>
    <no-data v-else :hideText="true" />
  </transition>
</template>
<script lang="ts" setup>
import HeartVue from '@/components/Heart.vue';
const props = defineProps<{
  user?: any
}>()
</script>
<style scoped>
.userPoster{
  @apply grid grid-cols-1 gap-y-4 p-4 justify-items-center;
  background: linear-gradient(315deg, #FBB03B, #F15A24,#ED1E79,#522785,#29ABE2);
}
.up-heart{
  @apply absolute top-1/2 left-1/2 blur-sm;
  transform: translate(-50%,-50%);
  filter: blur(4px);
  animation: paulse infinite 1s alternate ;
}
@keyframes paulse{
  0%{
    transform: translate(-50%,-50%) scale(.6);
  }
  100%{
    transform: translate(-50%,-50%) scale(1);
  }
}

.up-avatar-img{
  @apply relative my-auto bg-no-repeat bg-contain bg-center;
  z-index: 10;
  width: 10em;
  height: 10em;
  background-image: url('/img/dfinity.svg');
}
.ids-row{
  @apply flex justify-between items-end text-left mx-auto text-sm;
}
.ids-row label{
  @apply text-xs;
}
.ids-row .ids-copy{
  @apply cursor-pointer ml-4;
}
</style>