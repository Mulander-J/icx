/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { App } from 'vue'
// import useClipboard from 'vue-clipboard3'
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


// let copyText
// interface CopyText {
//   linkUrl: string
//   message: string
// }

// const copy = {
//   mounted(el: HTMLElement, binding: { value: CopyText }) {
//     copyText = binding.value
//     el.addEventListener(
//       'click',
//       async () => {
//         const { toClipboard } = useClipboard()
//         const { linkUrl, message } = copyText
//         try {
//           await toClipboard(linkUrl)
//           ElMessage.success(message)
//         } catch (e) {
//           ElMessage.error('copy fail')
//           console.error(e)
//         }
//       },
//       true,
//     )
//   },
//   updated(el: HTMLElement, binding: { value: string }) {
//     copyText = binding.value
//   },
// }

// const stopPropagation = {
//   beforeMount(el: HTMLElement) {
//     el.addEventListener(
//       'click',
//       (event: MouseEvent) => {
//         event.stopPropagation()
//         return false
//       },
//       true,
//     )
//   },
// }

const directives = {
  throttle,
}
const registDirectives = (app: App) => {
  Object.entries(directives).forEach(([k, v]) => {
    app.directive(k, v)
  })
}
export default registDirectives
