/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { App } from 'vue'
import useClipboard from 'vue-clipboard3'
import { useAuthStore } from '@/store/modules/auth'

const throttle = {
  mounted(el: HTMLElement, binding: { value: any }) {
    let throttleTime = binding.value // duration
    if (!throttleTime) {
      throttleTime = 800
    }
    let cbFun: unknown
    el.addEventListener(
      'click',
      (event: MouseEvent) => {
        if (!cbFun) {
          // once
          cbFun = setTimeout(() => {
            cbFun = null
          }, throttleTime)
        } else {
          event && event.stopImmediatePropagation()
        }
      },
      true,
    )
  },
}

let copyText
interface CopyText {
  ctx: string
  message?: string
}

const copy = {
  mounted(el: HTMLElement, binding: { value: CopyText }) {
    copyText = binding.value
    el.addEventListener(
      'click',
      async () => {
        const { toClipboard } = useClipboard()
        const { ctx } = copyText
        try {
          await toClipboard(ctx)
        } catch (e) {
          console.error(e)
        }
      },
      true,
    )
  },
  updated(el: HTMLElement, binding: { value: string }) {
    copyText = binding.value
  },
}

const sign = {
  beforeMount(el: HTMLElement,binding: { value: Function }) {
    el.addEventListener(
      'click',
      async (event: MouseEvent) => {
        event && event.stopImmediatePropagation()        
        const authStore = useAuthStore()
        if(authStore.isSign){
          const payloads = binding.value
          if(Array.isArray(payloads)){
            payloads[0](...payloads.slice(1))
          }else if (!!payloads){
            payloads()
          }
        }else{
          authStore.showDialog("none")
        }
      },
      true,
    )
  },
}

const directives = {
  throttle,
  copy,
  sign
}
const registDirectives = (app: App) => {
  Object.entries(directives).forEach(([k, v]) => {
    app.directive(k, v)
  })
}
export default registDirectives
