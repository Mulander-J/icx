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
        <p>COUNT - <strong>{{count}}</strong></p>
        <hr class="my-2 border-white/[.2] bg-white/[.3]" />
        <div class="w-">
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