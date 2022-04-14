import { defineStore } from "pinia";
import { AuthClient } from "@dfinity/auth-client"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    signedIn: false,
    client: null,
    clientReady: false,
    principal: ""
  }),
  getters: {},
  actions: {
    async initAuth(){
      let _client:any = await AuthClient.create()
      this.clientReady = true
      const isAuthenticated = await _client.isAuthenticated()
      this.client = _client
    
      if (isAuthenticated) {
        const identity = _client.getIdentity()
        this.principal = identity.getPrincipal().toString()
        this.signedIn = true
      }
    }
  }
});
