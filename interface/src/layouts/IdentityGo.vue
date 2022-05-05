<template>
  <Dialog :show="authStore.isDialogShow" @cancelCb="authStore.hideDialog">
    <transition name="fade" mode="out-in">      
      <div class="app-connect" :class="['ac-p-'+authStore.selectProvider]">
        <h2 class="ac-title pix-h2">        
          <span>{{authStore.providerName}}</span>          
        </h2>
        <rt-btn 
          v-show="authStore.selectProvider!=='none' || authStore.isWaiting" 
          class="absolute bottom-4 right-2" 
          icon="ri-arrow-go-back-line" 
          v-throttle @click="authStore.clearWaiting"
        />
        <transition name="fade" mode="out-in" class="p-4" tag="div">          
          <no-data v-if="authStore.isWaiting">Waiting</no-data>
          <section v-else-if="authStore.selectProvider==='ii'">
            <div v-if="authStore.isSign">
              <div class="pid-row">
                <strong>{{$filters.strSlice(authStore.principalId)}}</strong> 
                <cp-btn :txt="authStore.principalId"/>
              </div>             
              <div  class="pix-h2 acp-btn" @click="authStore.logout">              
                <span>Logout</span>
              </div>
            </div>
            <div v-else class="pix-h2 acp-btn" @click="authStore.getHttpAgent">              
              <span>Sign In</span>
            </div>  
          </section>
          <section v-else-if="authStore.selectProvider==='plug'">
            <div v-if="!authStore.isPlugDetected">
              <p class="my-8 text-2xl">Please Install Plug.</p>
              <a class="pix-h2 acp-btn" href="https://plugwallet.ooo/" target="_blank">INSTALL</a>
            </div>
            <div v-else-if="authStore.isSign">
              <div class="pid-row">
                <strong>{{$filters.strSlice(authStore.principalId)}}</strong> 
                <cp-btn :txt="authStore.principalId"/>
              </div>             
              <div  class="pix-h2 acp-btn" @click="authStore.logout">              
                <span>Logout</span>
              </div>
            </div>
            <div v-else>
              <p class="my-8 text-2xl">You are going to approve plug.</p>
              <div class="pix-h2 acp-btn" v-throttle @click="authStore.getHttpAgent">Connect</div>
              <p class="text-sm underline-offset-2 underline">Connect as agree to Terms of Use & Privacy Policy</p>        
            </div>
          </section>
          <section v-else>
            <p class="my-4 text-2xl">Please Select Provider.</p>
            <div class="pix-h2 ac-btn" @click="authStore.setProvider('ii')">              
              <span>Internet</span>
              <img class="ic-logo" src="@img/dfinity.svg" alt="" />
            </div>
            <div class="pix-h2 ac-btn" @click="authStore.setProvider('plug')">              
              <span>Plug</span>
              <img class="plug-logo" src="@img/plug.svg" alt="" />
            </div>
          </section>
        </transition>            
      </div>
    </transition>
  </Dialog>
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/store/modules/auth'
import Dialog from '@/components/Dialog.vue'

const authStore = useAuthStore()

</script>
<style scoped>
.app-connect{
  @apply bg-white/[.5] dark:bg-black/[.3] relative;
  min-height: 13.25rem;
}
.app-connect::after{
  @apply absolute top-0 left-0 bottom-0 right-0;
  content:'';
  z-index:-1;
  filter:blur(4px);
}
.pid-row{
  @apply grid items-center justify-center gap-x-2 text-2xl;
  grid-template-columns: auto auto;
}
.ac-title{
  @apply relative w-full p-1 rounded-lg text-white dark:text-black;
}
.ac-p-none .ac-title,
.ac-p-none::after{
  background: linear-gradient(45deg, #e81a91, #c865b3, #978cd8, #03acfd);
}
.ac-p-ii .ac-title,
.ac-p-ii::after{
  background: linear-gradient(94.95deg, #FBB03B, #F15A24,#ED1E79,#522785,#29ABE2);
}
.ac-p-plug .ac-title,
.ac-p-plug::after{
  background: linear-gradient(94.95deg, #FFE701 -1.41%, #FA51D3 34.12%, #10D9ED 70.19%, #52FF53 101.95%);
}
.ac-title img{
  @apply absolute top-1/2 left-4 h-4/5;
  transform: translateY(-50%);
}
.ac-btn{
  @apply select-none p-2 px-8 my-8 mx-auto cursor-pointer rounded-lg
  flex items-center justify-between w-full
  bg-white/[.6] hover:bg-white/[.8] dark:bg-black/[.6] dark:hover:bg-black/[.8];
  height:3em;
  transition: .3s all;
}
.ac-btn .ic-logo{
  width:3em;
}
.ac-btn .plug-logo{
  width:3em;
  height:3em;
  transform: rotate(-90deg);
}
.acp-btn{
   @apply select-none p-2 px-8 my-8 mx-auto cursor-pointer rounded-lg w-max
  bg-white hover:bg-white/[.8] dark:bg-black dark:hover:bg-black/[.8];
}
</style>