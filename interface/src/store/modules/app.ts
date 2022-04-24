import { defineStore } from "pinia"
import { isDeviceMobile } from '@/utils/getClient'
import { setPower, getPower } from "@/utils/power"
import { setDark as setTheDark, getDark } from "@/utils/dark"

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    dark: 'light',
    isOnChain: 'write',
    isMobile: isDeviceMobile(),

    appInfo: INITIAL_APP,
  }),
  getters: {
    getIsDark(state) {
      return state.dark === 'dark'
    },
    getIsOnline(state) {
      return state.isOnChain === 'write'
    },
    isAppFetched(state){
      return !state.appInfo?.unFetched
    }
  },
  actions: {
    setDark(dark:'light'|'dark'){
      this.dark = dark
      setTheDark(dark)
    },
    triggerDark(){
      this.setDark(this.dark === 'dark' ? 'light' : 'dark')
    },
    initialDark(){
      this.setDark(getDark()==='dark'?'dark':'light')
    },

    setIsOnChain(ioc:'write'|'read'){
      this.isOnChain = ioc
      setPower(ioc)
    },
    triggerPower(){
      this.setIsOnChain(this.isOnChain === 'write' ? 'read' : 'write')
    },
    initialPower(){
      this.setIsOnChain(getPower()==='read'?'read':'write')
    },

    setIsMobile(isMobile:boolean){
      this.isMobile = isMobile
    },

    setAppInfo(app:any){
      // console.log('setApp',app)
      this.appInfo = {...(app||INITIAL_APP)}
    },
  }
});

const INITIAL_APP = {
  unFetched: true,
  main:{
    title : "ICX",
    desc : "The X-DApp on IC",
    cover : "",
    content : "Web2sites Organizing-Tool for web2.5ers built by web3ers"
  },
  base:{
    id:1,
    pid:1,
    pids:[],
    isRoot:true
  },
  authors:[],
  lastUpdate:0
}