<template>
  <div class="p-5">
    <h2 class="pix-h2">      
      <span>ID SWITCH</span>
    </h2>
    <div class="lg:w-1/2 w-full">
      <div class="form-item">
        <label class="flex">Principal<cp-btn class="ml-2" :txt="principalId" /></label>        
        <input class="form-widget slate-widget p-2" v-model.trim="principalId" />        
      </div>
      <div class="text-center w-full my-4"><v-icon name="hi-switch-vertical" /></div>
      <div class="form-item">
        <label class="flex">Account ID<cp-btn class="ml-2" :txt="accountId" /></label>
        <input class="form-widget slate-widget p-2" :value="accountId" readonly />
      </div>
      <div class="my-4 text-rose-500" v-show="_errMsg">{{_errMsg}}</div>
      <div class="btn slate-widget font-pixie my-8 w-min py-2 px-8" v-throttle @click="handleSwitch">SWITCH</div>  
    </div>
  </div>
</template>
<script lang="ts" setup>
import { principalToAccountId } from '@/utils/filter'
import { ref } from 'vue'

const principalId = ref<any>('')
const accountId = ref<any>('')
const _errMsg = ref('')

const handleSwitch = ()=>{
  if(!principalId.value){
    _errMsg.value = "Please input principalId"
    return
  }  

  const _aid = principalToAccountId(principalId.value,null)

  if(_aid){
    _errMsg.value = ''
    accountId.value = _aid
  }else{
    _errMsg.value = 'Switch Meets Error'
  }
}


</script>