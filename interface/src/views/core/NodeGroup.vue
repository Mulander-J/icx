<template>
  <li>
    <divide class="pix-h2 text-left my-2">{{title}}</divide>
    <div class="grid gap-8 xl:grid-cols-5 lg:grid-cols-3 grid-cols-2">
      <section 
        class="node-card" 
        v-for="(ll,i) in list" :key="title+'_'+i"
        @click="$router.push('/info/'+ll.base.id)"
      >
        <div class="node-cover">
          <div class="cover-avatar bg-main"></div>
        </div>
        <div class="node-text">
          <p class="text-3xl font-bold ">{{ll.main.title}}</p>
          <p class="text-xs">{{ll.main.desc}}</p>
          <p class="text-sm">{{ll.main.content}}</p>
        </div>         
      </section>
    </div>
  </li>
</template>
<script lang="ts">
export default {
  props:['list','title']
}
</script>
<style scoped>
.node-card{
  @apply grid md:grid-cols-3 grid-cols-2 gap-x-4 items-center rounded-lg bg-white/[.3] p-2 relative cursor-pointer;
  max-width: 20em;
}
.node-card::after{
  @apply rounded-lg absolute w-full h-full bg-white/[.1] top-2 left-2;
  z-index: -1;
  content: '';
  transition: all .3s ease;
}
.node-card:hover.node-card::after{
  @apply bg-white/[.2] -top-2 -left-2;
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

.online .bg-main{
  @apply bg-sky-600/[.8];
}
.offline .bg-main{
  @apply bg-rose-600/[.6];
}
</style>