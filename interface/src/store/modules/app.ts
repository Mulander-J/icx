import { defineStore } from "pinia";
import { INITIAL_MSG, MessageType } from '@/model/msg'
import { uuid } from '@/utils'
import { isMobile } from '@/utils/getClient'
import dealErr from '@/utils/dealErr'

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    dark: 'light',
    isMobile: isMobile(),
    isOnChain: false,
    icCalls: 0,
    icMsgs: [INITIAL_MSG],
  }),
  getters: {
    getIsDark(state) {
      return state.dark === 'dark';
    },
    getIsLoading(state) {
      return state.icCalls > 0;
    }
  },
  actions: {
    setDark(dark:'light'|'dark'){
      this.dark = dark
    },
    setIsOnChain(ioc:boolean){
      this.isOnChain = ioc
    },
    addCall(){
      this.icCalls++
    },
    removeCall(){
      this.icCalls--
      this.icCalls < 0 && ( this.icCalls = 0)
    },
    addMsg(text:string, type: MessageType){
      const _msgs = this.icMsgs.concat([{
        key: uuid(),
        text,
        type
      }]);
      this.icMsgs = _msgs.slice(-5);
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