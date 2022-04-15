<template>
  <Suspense v-if="asyncComShow">
    <template #default>
        <slot :retry="retry" />
    </template>
    <template #fallback> Loading ... </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { nextTick,ref } from "vue"
const asyncComShow = ref(true)
function retry() {
  asyncComShow.value = false
  nextTick(() => {
    asyncComShow.value = true
  })
}
</script>