<template>
  <div class="p-5">
    <h2 class="pix-h2 flex items-center">      
      <span>{{_isEdit?'MODIFY':'CREATE'}} NODE</span>
      <rt-btn class="ml-2" icon="ri-arrow-go-back-line" v-throttle @click="$router.push('/list')" />
    </h2>
    <div class="lg:w-1/2 w-full">
      <div class="form-item">
        <label>Title</label>
        <textarea class="form-widget slate-widget p-2" v-model.trim="_formData.content" cols="25" rows="5" placeholder="Write down your advice" />
      </div>
      <div class="form-item">
        <label>Desc</label>
        <textarea class="form-widget slate-widget p-2" v-model.trim="_formData.content" cols="25" rows="5" placeholder="Write down your advice" />
      </div>
      <div class="form-item">
        <label>Content</label>
        <textarea class="form-widget slate-widget p-2" v-model.trim="_formData.content" cols="25" rows="5" placeholder="Write down your advice" />
      </div>
      <div class="my-4 text-rose-500" v-show="_errMsg">{{_errMsg}}</div>
      <div class="btn slate-widget font-pixie my-4 w-min py-2 px-8" v-throttle @click="addItem">SUBMIT</div>  
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from "@/store/modules/app"
import { InsICXFactory } from "@/hooks/useCanister"

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const _isEdit = ref(false)
const _formData = ref({type:'',content:''})

const _errMsg = ref('')

const addItem = async ()=>{
  if(appStore.getIsLoading) return
  const {content,type} = _formData.value
  if(!type){
    _errMsg.value = 'Type is required.'
    return
  }
  if(!content){
    _errMsg.value = 'Content is required.'
    return
  }
  
  _errMsg.value = ''

  const payloads = [{[type]:null},content]

  await appStore.handleCall({
    name:'Add Feedback',
    cmd:InsICXFactory.insertFeedback,
    okTip:true,
    cbk:()=>{
      _formData.value = {type:'',content:''}
    }, 
  },...payloads)
}

const checkId = ()=>{
  const id = route.params.id  
  if(id && ['Create','Modify'].includes(route.name as string)){
    _isEdit.value = route.name === 'Modify'
    return id
  }
  router.push('/404')
  return false
}

const initialNode = async ()=>{
  const _id = checkId()
  console.log('[_id]',_id)
}

onBeforeMount(checkId)

onMounted(initialNode)
</script>