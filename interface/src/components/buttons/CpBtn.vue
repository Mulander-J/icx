<template>
 <div @click.stop.prevent="handleCopy" title="COPY">
    <v-icon :name="copyIcon"/>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'
const props = defineProps<{
  txt?: string|any
}>()

const { toClipboard } = useClipboard()

const copyIcon = ref('io-copy')

const handleCopy = async ()=>{ 
  try{
    await toClipboard(props.txt)
    copyIcon.value = 'md-libraryaddcheck-round'
    setTimeout(()=>{
      copyIcon.value = 'io-copy'
    },2000)
  }catch{
    copyIcon.value = 'io-copy'
  }
}
</script>