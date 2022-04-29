import { defineStore } from "pinia"
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent } from '@dfinity/agent'
import { cidICX, cidICXFactory } from '@/hooks/canisters'
import { INITIAL_MSG, MessageType } from '@/model/msg'
import { uuid } from '@/utils'
import dealErr from '@/utils/dealErr'
import { useAppStore } from './app'
import notify from '@/components/notify/core'

// let identityProvider = "http://rwlgt-iiaaa-aaaaa-aaaaa-cai.localhost:8000/";
let authClient;
let identityProvider = null;
let localhostProvider = !!identityProvider;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isSign: false,
    isDialogShow: false,
    isWaiting: false,    
    selectProvider:"none" as "none"|"ii"|"plug",

    // authClient: null as any,
    inInitAuthClient: false,
    agent: null as any,
    principalId:"",

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
    isPlug(state){
      return state.selectProvider === 'plug'
    },
    isPlugDetected(){
      return !!window?.ic?.plug
    },
    getIsLoading(state) {
      return state.icCalls > 0
    },
  },
  actions: {
    setPrincipal(pid:string){
      this.principalId = pid
    },
    setIsSign(b:boolean){
      this.isSign = b
    },
    setIsWaiting(b:boolean){
      this.isWaiting = b
    },
    clearWaiting(){
      this.selectProvider = "none"
      this.isWaiting = false
      this.isSign = false
      this.agent = null
      this.principalId = ''
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
      if(!this.isSign) this.selectProvider = 'none'
    },
    showLoading(){      
      this.isWaiting = true
      this.isDialogShow = true
    },
    hideLoading(){      
      this.isWaiting = false
      this.hideDialog()
    },

    signOk(principal:string){           
      console.log("principal", principal)
      this.principalId = principal
      this.isDialogShow = false
      this.isWaiting = false
      this.isSign = true
      this.addMsg("Sign Success",MessageType.SUCCESS)
    },

    async getAuthClient() {
        while (this.inInitAuthClient) {
            await new Promise((resolve:any) => {
                setTimeout(() => {
                    resolve();
                }, 100)
            });
        }
        if (authClient) {
            return authClient;
        }
        this.inInitAuthClient = true;
        try {
            authClient = await AuthClient.create();
        } catch (e) {
            console.log(e);
        }
        this.inInitAuthClient = false
        return authClient;
    },

    async isAgentExpiration() {
      return new Promise(async (resolve, reject) => {
          await this.getAuthClient()
          const identity = authClient.getIdentity()
          if (authClient.isAuthenticated() && identity.getDelegation) {
              const nextExpiration = identity.getDelegation().delegations
                                      .map(d => d.delegation.expiration)
                                      .reduce((current, next) => next < current ? next : current);
              const expirationDuration  = nextExpiration - BigInt(Date.now()) * BigInt(1000_000);
  
              // 120 second
              resolve(expirationDuration < BigInt(120000000000))
          }
  
          resolve(true)
      })
    },
    async getHttpAgent() {
      return new Promise(async (resolve, reject) => {
          this.showLoading()
          if (this.isPlug) {
              try{
                const whitelist = [cidICX,cidICXFactory]
                await window?.ic?.plug?.requestConnect({whitelist});
                const _agent = window?.ic?.plug?.agent
                const _identity = await _agent._identity
                const principal = _identity._principal.toString()
                this.signOk(principal)
                this.agent = _agent
                resolve(_agent)
              }catch(e:any){
                this.addMsg(e.message||e,MessageType.WARN)
                reject(null)
              }finally{
                this.hideLoading()
              }
              return
          }
  
          await this.getAuthClient()
          const isExpiration = await this.isAgentExpiration()
          if (!isExpiration) {
              let _agent = this.agent
              if(!_agent){
                _agent = new HttpAgent({identity: authClient.getIdentity()})
                if (localhostProvider) {
                    await _agent.fetchRootKey()
                }
                this.agent = _agent
              }
              const principal = await _agent.getPrincipal()
              this.signOk(principal.toString())
              resolve(_agent)
              return
          }
  
          if (authClient) {
            authClient.login({
              identityProvider,
              maxTimeToLive: BigInt(24 * 3600_000_000_000),
              onSuccess: async () => {    
                  console.log('httpagent',1)     
                  const _agent = new HttpAgent({identity: authClient.getIdentity()})
                  if (localhostProvider) {
                      await this.agent.fetchRootKey()
                  }
                  const identity = authClient.getIdentity()
                  this.signOk(identity.getPrincipal().toString())
                  this.agent = _agent
                  resolve(_agent)
              },
              onError: (e) => {
                  console.log('httpagent',e)
                  const _agent = new HttpAgent()
                  this.hideLoading()
                  this.addMsg("You reject auth",MessageType.WARN)
                  this.agent = _agent
                  reject(_agent)
              }
            })
          }
      })
    },
    async logout() {
      if (!this.isPlug) {
        authClient && authClient.logout()
        // authClient = null
        // this.inInitAuthClient = false
      }
      this.agent = null
      this.isSign = false
      this.selectProvider = "none"
    },


    addCall(){
      this.icCalls++
    },
    removeCall(){
      this.icCalls--
      this.icCalls < 0 && ( this.icCalls = 0)
    },

    addMsg(text:string, type?: MessageType){
      const appStore = useAppStore()
      if(appStore.isMobile){
        notify({content:text})
      }else{
        const _msgs = this.icMsgs.concat([{
          key: uuid(),
          text,
          type:type || MessageType.INFO
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