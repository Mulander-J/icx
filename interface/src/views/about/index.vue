<template>
  <div class="ctx-center wh-full justify-between py-5">
    <div class="logo-avatar font-sc"></div>
    <ul class="grid lg:grid-cols-3 grid-cols-1 gap-4 items-start text-center">
      <li v-for="ca in canisters" :key="ca.key">
        <h2 class="pix-h2">{{ca.label}}</h2>
        <p>{{ca.desc}}</p>
        <p>
          <label class="mr-2">IC-Rock:</label>
          <a class="text-amber-600 hover:text-amber-600/[.8]" :href="$filters.rockExplor(ca.canisterId)" target="_blank">{{$filters.strSlice(ca.canisterId)}}</a>
        </p>
        <p>
          <label class="mr-2">Cycle:</label>
          <strong>{{ca.cycle}}</strong>
        </p>
      </li>
    </ul>
    <section class="text-center">     
      <ul class="grid grid-cols-5 gap-x-4">
        <li v-for="cm in community" :key="cm.key">
          <a class="cursor-pointer  p-2 rounded-full flex">
            <v-icon :name="cm.icon" :scale="1.6" animation="wrench" hover/>
          </a>
        </li> 
      </ul>
      <p class="font-pixie my-4"><strong>{{appInfo.title}}</strong></p>
      <p>{{appInfo.desc}}</p>
      <p>{{appInfo.content}}</p>
      <p>Copyright © 2022 ICX. All rights reserved.</p>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { CanisterList } from '@/hooks/canisters/index'
import { InsCycle } from '@/hooks/useCanister'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const appInfo = computed(()=>appStore.appInfo.main)

const community = [
  {key:'twitter',label:'twitter',link:'',icon:'io-logo-twitter'},
  {key:'telegram',label:'telegram',link:'',icon:'bi-telegram'},
  {key:'discord',label:'discord',link:'',icon:'io-logo-discord'},
  {key:'github',label:'github',link:'',icon:'io-logo-github'},
  {key:'doc',label:'doc',link:'',icon:'gi-evil-book'},
]
const canisters = ref<any>(CanisterList.map(e=>({...e,cycle : 0})))

onBeforeMount(()=>{
  let queue = CanisterList.map(e=>InsCycle(e.canisterId).getCycles())
  Promise.allSettled(queue).then((results:any[])=>{
    // console.log('[results]',results)
    let _can = canisters.value
    results.map((res:any,i)=>{
      _can[i].cycle = res.status === 'fulfilled' ? Number(res.value) : 'Unknow'
    }) 
    canisters.value = [..._can]
  }).catch(err=>{console.log(err)})
})

</script>
<style scoped>
.logo-avatar{
  @apply bg-slate-800/[.6] dark:bg-white/[.8];
  mask-image: url('/img/logo.svg');
  mask-position: 50% bottom;
  mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: contain;
  min-height: 2.5em;
  min-width: 5em;
}
</style>