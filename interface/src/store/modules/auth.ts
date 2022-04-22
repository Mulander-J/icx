import { defineStore } from "pinia"
import { useAppStore } from './app'
import { INITIAL_MSG, MessageType } from '@/model/msg'
import { uuid } from '@/utils'
import dealErr from '@/utils/dealErr'
import notify from '@/components/notify/core'

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isSign: false,
    isDialogShow: false,
    isWaiting: false,    
    selectProvider:"none" as "none"|"ii"|"plug",

    icCalls: 0,
    icMsgs: [INITIAL_MSG],
  }),
  getters: {
    providerName(state){
      switch(state.selectProvider){
        case 'ii':
          return 'Internet';
        case 'plug':
          return 'Plug';
        default:
          return 'Identity'
      }
    },
    isPlugDetected(){
      return !!window?.ic?.plug
    },
    getIsLoading(state) {
      return state.icCalls > 0
    },
  },
  actions: {
    setIsSign(b:boolean){
      this.isSign = b
    },
    setIsWaiting(b:boolean){
      this.isWaiting = b
    },
    setProvider(name:"none"|"ii"|"plug"){
      this.selectProvider = name
    },
    setDialogShow(b:boolean){
      this.isDialogShow = b
    },
    showDialog(name?:"none"|"ii"|"plug"){
      this.isDialogShow = true
      name && (this.selectProvider = name)
    },
    hideDialog(){
      this.isDialogShow = false
    },
    showLoading(){      
      this.isWaiting = true
      this.isDialogShow = true
    },
    addCall(){
      this.icCalls++
    },
    removeCall(){
      this.icCalls--
      this.icCalls < 0 && ( this.icCalls = 0)
    },
    addMsg(text:string, type: MessageType){
      const appStore = useAppStore()
      if(appStore.isMobile){
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