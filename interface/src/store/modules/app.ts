import { defineStore } from "pinia";
export const useAppStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "app",
  state: () => ({
    dark: 'light'
  }),
  getters: {
    getIsDark(state) {
      return state.dark === 'dark';
    },
  },
  actions: {
    setDark(dark:'light'|'dark'){
      this.dark = dark
    }
    // setClientWidth(payload) {
    //   try {
    //     setTimeout(() => {
    //       this.clientWidth = payload;
    //     }, 2000);
    //   } catch (error) {}
    // },
  }
});
