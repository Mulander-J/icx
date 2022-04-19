<template>
  <div>
    <h2 class="pix-h2">{{title}}</h2>
    <div>
      <div v-for="(ll,i) in list" :key="title+'_'+i">
        <p class="text-zinc-400 mb-2 text-sm indent-1">{{$filters.dateStr(ll.lastUpdate)}}</p>
        <section class="log-item">
          <p>
            title:{{ll.main.title}};
            content:{{ll.main.content}};
            desc:{{ll.main.desc}};
            cover:{{ll.main.cover}};
          </p>         
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props:['list','title']
}
</script>