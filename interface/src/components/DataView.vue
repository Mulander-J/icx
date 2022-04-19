<template>
 <transition name="fade" mode="out-in">     
    <no-data v-if="isError" :isFull="isFull">
      <p class="text-rose-500">{{txtLoading}}</p>
      <div class="slate-widget btn lgBtn" v-throttle @click="retry">{{txtRetry}}</div>
    </no-data>
    <no-data v-else-if="isEmpty" :isFull="isFull">
      <slot name="empty">
        <p class="text-gray-800">{{txtNoData}}</p>
        <div v-if="!hideCreate" class="slate-widget btn lgBtn" v-throttle @click="create">{{txtCreate}}</div>
      </slot>
    </no-data>
    <div v-else>
      <slot  />
      <div class="text-center font-pixie" v-if="!hidePageFooter">
        <p class="overflow-hidden relative text-center">
          <span class="dw-hr relative px-4 align-baseline">COUNT - <strong>{{count}}</strong></span>
        </p>
        <div v-if="!hidePageNext">
          <span v-if="isEnd">END</span>
          <div v-else class="slate-widget btn icoBtn mx-auto" v-throttle @click="nextPage">
            <v-icon name="md-expandmore-round"/>
          </div>
        </div>            
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
 export default {
  props:{
    count: Number,
    isError:Boolean,
    isEmpty:Boolean,
    isEnd:Boolean,
    isFull:Boolean,

    hideCreate: Boolean,
    hidePageFooter: Boolean,
    hidePageNext: Boolean,

    retry: {},
    create: {},
    nextPage:{},

    txtLoading:{type:String,default:'LOADING ERROR'},
    txtRetry:{type:String,default:'RETRY'},
    txtNoData:{type:String,default:'NO DATA'},
    txtCreate:{type:String,default:'CREATE'},
  }
 }
</script>
<style scoped>
.dw-hr::before,
.dw-hr::after{
  content: '';
  display: block;
  width: 1000px;
  position: absolute;
  top: 0.73em;
  border-top: 2px solid rgba(255,255,255,.3);
}
.dw-hr::before{
  right: 100%;
}
.dw-hr::after{
  left: 100%;
}
</style>