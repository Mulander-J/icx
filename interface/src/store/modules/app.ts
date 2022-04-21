import { defineStore } from "pinia";
import { INITIAL_MSG, MessageType } from '@/model/msg'
import { InsICX } from "@/hooks/useCanister"
import { uuid } from '@/utils'
import { isDeviceMobile } from '@/utils/getClient'
import { setPower, getPower } from "@/utils/power"
import { setDark as setTheDark, getDark } from "@/utils/dark";
import dealErr from '@/utils/dealErr'
import notify from '@/components/notify/core'

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    dark: 'light',
    isOnChain: 'write',
    isMobile: isDeviceMobile(),
    icCalls: 0,
    icMsgs: [INITIAL_MSG],
    appInfo: INITIAL_APP,
  }),
  getters: {
    getIsDark(state) {
      return state.dark === 'dark'
    },
    getIsOnline(state) {
      return state.isOnChain === 'write'
    },
    getIsLoading(state) {
      return state.icCalls > 0
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
      console.log(isMobile)
    },

    setAppInfo(app:any){
      this.appInfo = {...app}
    },

    addCall(){
      this.icCalls++
    },
    removeCall(){
      this.icCalls--
      this.icCalls < 0 && ( this.icCalls = 0)
    },
    addMsg(text:string, type: MessageType){
      if(this.isMobile){
        notify({content:text})
      }else{
        const _msgs = this.icMsgs.concat([{
          key: uuid(),
          text,
          type
        }]);
        this.icMsgs = _msgs.slice(-5);
      }
    },
    removeMsg(key:string){
      this.icMsgs = this.icMsgs.filter(e=>e.key!==key)      
    },
    clearMsg(){
      this.icMsgs.length = 0
    },

    async handleCall(opt:CallOpt, ...args:any){
      const {
        name,cmd,
        cbk=null,rej=null,
        apartLoad = false,okTip=false
      } = opt
      try{
        console.log(`%c [Call-Start]-${name||"Func"}`,'color:skyblue')
        
        !apartLoad && this.addCall()
        
        args.length > 0  && console.log(`%c [Call-Payloads]-${name||"Func"}`,'color:purple',args)
        
        const _res = await cmd(...args)
        
        console.log(`%c [Call-Recept]-${name||"Func"}`,'color:green' ,_res)
        
        if(_res?.err) throw Error(_res.err)

        okTip && this.addMsg(`${name} Success`, MessageType.SUCCESS)
        
        cbk && cbk(_res)
        
        return _res
      }catch(err:any){        
        console.log(`%c [Call-Error]-${name||"Func"}`, 'color:red',err)
        
        const _msg = dealErr(err)
        this.addMsg(_msg, MessageType.ERROR)
        
        rej && rej(err)
        
        return null
      }finally{
        !apartLoad && setTimeout(this.removeCall,800) // for animation loading
        
        console.log(`%c [Call-End]-${name||"Func"}`,'color:skyblue')   
      }
    },
    
    getAppNode(){
      return this.handleCall({
        name:'AppInfo',
        cmd: InsICX.AppInfo,
        cbk:(res:any)=>{this.setAppInfo(res[0]||INITIAL_APP)},
        rej:()=>{this.setAppInfo(INITIAL_APP)}
      })
    }
  }
});

type CallOpt = {
  name:string, // func name
  cmd:any,  //  func need to be excuted
  cbk?:any, //  ok-callback
  rej?:any, //  err-callback
  apartLoad?:boolean, // not add into global loading
  okTip?:boolean  // show tips when success
}

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