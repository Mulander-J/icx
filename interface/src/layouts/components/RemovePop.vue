<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  target?: string,
  isShow?: boolean
}>()

const emits = defineEmits(['onPass']);

const _check = ref('')
const _pass = computed(()=>!!_check.value  && _check.value === props.target)

const handlePass = ()=>{
  _pass.value && emits('onPass')
}

watch(()=>props.isShow,()=>{_check.value = ''})

</script>
<template>
  <div class="grid gap-y-4 text-left">
    <p class="mb-4 text-2xl">Are you absolutely sure?</p>
    <p>This action cannot be undone. This will permanently delete the Node({{target}}) and its' subsets.</p>
    <p>Please type <strong class="text-rose-500">{{target}}</strong> to confirm.</p>
    <input class="form-widget slate-widget my-4 p-2 text-rose-600 font-bold" v-model="_check"/>
    <div class="btn passBtn" :class="{'unPass':!_pass}" v-throttle v-sign="handlePass">I understand the consequences, delete this node</div>
  </div>
</template>
<style scoped>
.passBtn{
  @apply p-2 text-center select-none bg-rose-400/[.8] hover:bg-rose-400/[.6] dark:bg-rose-600 dark:hover:bg-rose-600/[.8];
}
.unPass{
  @apply cursor-not-allowed bg-gray-300 hover:bg-gray-300/[.8] dark:bg-gray-400 dark:hover:bg-gray-400/[.8]
}
</style>