<template>
  <div class="userPoster">
    <div class="text-left text-2xl w-full"># {{$filters.frBN(user?.no || 0)}}</div>
    <div class="relative">
      <div class="up-heart"><HeartVue l="2.5em" c="rgba(255,255,255)"/></div>
      <div class="up-avatar-img"></div>
    </div>
    <p class="font-pixie uppercase">{{_name || user?.alias || 'Anonymous'}}</p>
    <p class="text-3xl my-2 font-extrabold">{{user?.point || 0}}</p>
    <div class="ids-row">
      <div>
        <label>Public Key</label>
        <p>{{$filters.strSlice(user?.account || '')}}</p>
      </div>
        <cp-btn class="ids-copy" :txt="user?.account"/>
    </div>
    <div class="ids-row">
      <div>
        <label>Principal Id</label>
        <p>{{$filters.strSlice(user?.id || '')}}</p>
      </div>
      <cp-btn class="ids-copy" :txt="user?.id"/>
    </div>
    <transition class="my-2 text-center text-sm" name="fade" mode="out-in">
      <div v-if="_isFetch">Cheking...</div>
      <div v-else-if="_isEmpty" class="text-center">
        <p>This id has no IC-Naming registered yet.</p>
        <div class="slate-widget btn lgBtn mx-auto" @click="fetchICNS">ReCheck</div>
      </div>   
      <div v-else-if="!_isEmpty&&_name">
        <p>{{_name}}</p>
        <div v-if="_records.length>0" class="my-1">
          <label>Records: </label>
          <a class="cursor-pointer mx-2 underline underline-offset-2" :href="r[1]" target="_blank" rel="nofollow noopener" v-for="(r,ri) in _records" :key="ri">[{{r[0]}}]</a>
        </div>
      </div>
      <div v-else class="text-center">
        <p>IC-Naming is supported. Check if this id has registered.</p>
        <div class="slate-widget btn lgBtn mx-auto" @click="fetchICNS">Check</div>
      </div>
    </transition>
    <div class="exploreRow">
        <a class="explores" title="IC-Naming" href="https://app.icnaming.com/" target="_blank" rel="nofollow noopener">
          <img src="@img/icnaming.svg" alt="">
        </a>
        <a class="explores" title="Chat with me" href="https://6hsbt-vqaaa-aaaaf-aaafq-cai.ic0.app/" target="_blank" rel="nofollow noopener">
          <img src="@img/openchat.svg" alt="">
        </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from "@/store/modules/auth"
import { InsIcnRegistry, InsIcnResolve } from '@/hooks/useCanister'
import { txt2Principal } from '@/utils/filter'
import HeartVue from '@/components/Heart.vue'

const props = defineProps<{
  user?: any
}>()

const authStore = useAuthStore()

const _isFetch = ref(false)
const _isEmpty = ref(false)
const _name = ref('')
const _records = ref<any>([])

const fetchICNS = async ()=>{
  if(_isFetch.value) return
  _isFetch.value = true
  _isEmpty.value = false
  _records.value  = []
  _name.value = '' 
  try{
    const res = await authStore.handleCall({
      name:'Get ICNS Name',
      cmd: InsIcnRegistry.get_controlled_names
    },txt2Principal(props.user?.id),{offset:0,limit:1})

    if(res?.Ok?.items?.length > 0){
      _isEmpty.value = false
      _name.value = res.Ok.items[0]
      const rec = await authStore.handleCall({
        name:'Get ICNS Record',
        cmd: InsIcnResolve.get_record_value
      },_name.value)
      if(rec?.Ok?.length > 0){
        _records.value = [...rec.Ok]
      }
    }else{
      _isEmpty.value = true
    }
  }catch(err){
    console.log('Fetch ICNS',err)
  }finally{
    _isFetch.value = false
  }
}

</script>
<style scoped>
.userPoster{
  @apply grid grid-cols-1 gap-y-4 p-4 justify-items-center;
  background: linear-gradient(315deg, #FBB03B, #F15A24,#ED1E79,#522785,#29ABE2);
}
.up-heart{
  @apply absolute top-1/2 left-1/2 blur-sm;
  transform: translate(-50%,-50%);
  filter: blur(4px);
  animation: paulse infinite 1s alternate ;
}
@keyframes paulse{
  0%{
    transform: translate(-50%,-50%) scale(.6);
  }
  100%{
    transform: translate(-50%,-50%) scale(1);
  }
}

.up-avatar-img{
  @apply relative my-auto bg-no-repeat bg-contain bg-center;
  z-index: 10;
  width: 10em;
  height: 10em;
  background-image: url('/img/dfinity.svg');
}
.ids-row{
  @apply flex justify-between items-end text-left mx-auto text-sm;
}
.ids-row label{
  @apply text-xs;
}
.ids-row .ids-copy{
  @apply cursor-pointer ml-4;
}
.exploreRow{
  @apply w-full flex items-center justify-end;
}
.explores{
  height: 1.4rem;
  width: 1.4rem;
  margin: 0 .8rem;
}
.explores img{
  height: 100%;
  width: 100%;
}
</style>