<template>
  <li>
    <divide v-if="title" class="pix-h2 text-left my-2">{{title}}</divide>
    <div class="grid gap-8 xl:grid-cols-5 lg:grid-cols-3 grid-cols-2">
      <NodeItem 
        v-for="(ll,i) in list" :key="i" :item="ll"
        @click="$router.push('/info/'+ll?.base?.id||'0')"
      />
    </div>
  </li>
</template>
<script lang="ts" setup>
import NodeItem from "./NodeItem.vue"
const props = defineProps<{
  list: any []  
  title?: string | number
}>()
</script>