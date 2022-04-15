<template>
 <transition name="fade" mode="out-in">     
    <no-data v-if="isError" :isFull="isFull">
      <p class="text-rose-500">{{txtLoading}}</p>
      <div class="slate-btn w-min mt-6 py-2 px-8 rounded-xl" v-throttle @click="retry">{{txtRetry}}</div>
    </no-data>
    <no-data v-else-if="isEmpty" :isFull="isFull">
      <slot name="empty">
        <p class="text-gray-800">{{txtNoData}}</p>
        <div class="slate-btn w-min mt-6 py-2 px-8 rounded-xl" v-throttle @click="create">{{txtCreate}}</div>
      </slot>
    </no-data>
    <slot v-else />
  </transition>
</template>
<script lang="ts">
 export default {
  props:{
    isError:Boolean,
    isEmpty:Boolean,
    isFull:Boolean,
    retry: {},
    create: {},
    txtLoading:{type:String,default:'LOADING ERROR'},
    txtRetry:{type:String,default:'RETRY'},
    txtNoData:{type:String,default:'NO DATA'},
    txtCreate:{type:String,default:'CREATE'},
  }
 }
</script>