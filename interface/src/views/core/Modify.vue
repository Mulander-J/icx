<template>
  <div class="p-5">
    <h2 class="pix-h2 flex items-center">      
      <span>{{_isEdit?'MODIFY':'CREATE'}} NODE</span>
      <rt-btn class="ml-2" icon="ri-arrow-go-back-line" v-throttle @click="$router.push('/list')" />
    </h2>
    <div class="lg:w-1/2 w-full">
      <div class="form-item">
        <label>Parent ID</label>
        <div class="form-widget slate-widget p-2 cursor-not-allowed">{{_base.pid}}</div>
      </div>
      <div class="form-item">
        <label>Title</label>        
        <input class="form-widget slate-widget p-2" v-model.trim="_formData.title" placeholder="Title" />
      </div>
      <div class="form-item">
        <label>Desc</label>
        <input class="form-widget slate-widget p-2" v-model.trim="_formData.desc" placeholder="Desc" />
      </div>
      <div class="form-item">
        <label>Content</label>
        <textarea class="form-widget slate-widget p-2" v-model.trim="_formData.content" cols="25" rows="3" placeholder="Content" />
      </div>
      <div class="my-4 text-rose-500" v-show="_errMsg">{{_errMsg}}</div>
      <div class="btn slate-widget font-pixie my-4 w-min py-2 px-8" v-throttle v-sign="submitItem">SUBMIT</div>  
    </div>
    <ul>
      <divide class="pix-h2">Preview</divide>
      <p class="slate-widget txt-main my-4 p-2 w-min select-none">Node.Lv<strong>{{_base.level}}</strong></p>
      <NodeItem :item="previewNode" />
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, computed, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useAppStore } from '@/store/modules/app'
import { getInsICX, InsICX } from '@/hooks/useCanister'
import { frBN } from '@/utils/filter'
import { okHref } from '@/utils'
import NodeItem from './NodeItem.vue';

const DEFULT_FORM = {title:'',content:'',desc:'',cover:''}

const { proxy } = getCurrentInstance() as any
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()

const _isEdit = ref(false)
const _base = ref({
  level:1,
  pid:1,
  submitId:1,
  isRoot: false
})
const _formData = ref({...DEFULT_FORM})
const previewNode = computed(()=>{
  return {
    main:{..._formData.value},
    base:{..._base.value}
  }
})

const _errMsg = ref('')

const submitItem = async ()=>{  
  if(authStore.getIsLoading) return
  const {content,title} = _formData.value
  if(!title){
    _errMsg.value = 'Title is required.'
    return
  }
  if(!content){
    _errMsg.value = 'Content is required.'
    return
  }
  if(_base.value.level===3 && !okHref(content)){
    _errMsg.value = 'Content is not a correct link.'
    return
  }
  
  _errMsg.value = ''

  proxy.$verify({},async (res:boolean)=>{
    if(!res) return

    if(!authStore.agent) return

    const actor = getInsICX(authStore.agent)

    const payloads = [_base.value.submitId,_formData.value]

    await authStore.handleCall({
      name:_isEdit.value?'Update node':'Create node',
      cmd:_isEdit.value?actor.updateNode:actor.addNode,
      okTip:true,
      cbk:()=>{
        if(_base.value.isRoot){
          appStore.setAppInfo({
            ...appStore.appInfo,
            main:{..._formData.value}
          })
        }
        if(!_isEdit.value){
          _formData.value = {...DEFULT_FORM}
        }
      }, 
    },...payloads)
  }) 
}

const checkId = ()=>{
  const id = route.params.id  
  if(id && ['Create','Modify'].includes(route.name as string)){
    _isEdit.value = route.name === 'Modify'
    return Number(id)
  }
  router.push('/404')
  return false
}

const initialNode = async ()=>{
  const _id = checkId()

  if(!_id) return false
  
  try{
    const res = await authStore.handleCall({
      name:'NodeById',
      cmd:InsICX.NodeById
    },_id)

    const {base=null,main=null} = res?.[0]

    if(!!base && !!main){
      if (_isEdit.value){
        _formData.value = {
          ...DEFULT_FORM,
          ...main
        }
        _base.value = {
          submitId:_id,
          level:frBN(base.level),
          pid:frBN(base.pid),
          isRoot: base.isRoot
        }
      }else{
        if(base.level<=2 && base.level>=1){
          _formData.value = {
            ...DEFULT_FORM
          }
          _base.value = {
            submitId:frBN(base.id),
            level:frBN(base.level)+1,
            pid:frBN(base.id),
            isRoot: false
          }
        }else{
          throw Error('Wrong Level')
        }
      }
    }else{
      throw Error('Not Found')      
    }
  }catch(err){
    console.log(err)
    router.push('/404')  
  }
}

onBeforeMount(checkId)

onMounted(initialNode)
</script>