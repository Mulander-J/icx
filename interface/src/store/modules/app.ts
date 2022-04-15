import { defineStore } from "pinia";
import { INITIAL_MSG, MessageType } from '@/model/msg'
import { uuid } from '@/utils'
import { isMobile } from '@/utils/getClient'
import dealErr from '@/utils/dealErr'

export const useAppStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
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
    async handleCall(name:string,cmd:any,cbk:any,rej :any, ...args){
      try{
        console.log(`%c [Call-Start]-${name||"Func"}`,'color:skyblue')
        this.addCall()
        const _res = await cmd(...args)
        console.log(`%c [Call-Recept]-${name||"Func"}`,'color:green' ,_res)
        cbk && cbk(_res)
      }catch(err:any){
        console.log(`%c [Call-Error]-${name||"Func"}`, 'color:red',err)
        const _msg = dealErr(err)
        this.addMsg(_msg, MessageType.ERROR)
        rej && rej(err)
      }finally{
        this.removeCall()
        console.log(`%c [Call-End]-${name||"Func"}`,'color:skyblue')   
      }
    }
  }
});
