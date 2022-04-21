export const getServeRunning = ()=>{
  const weekDay = new Date().getDay()
  return weekDay !== 6
}
export const uuid = ()=>{
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g , function(c) {
    var rnd = Math.random()*16 |0, v = c === 'x' ? rnd : (rnd&0x3|0x8) ;
    return v.toString(16);
    });
}

export const Alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
export const alphabetMap = Object.fromEntries(Alphabets.map(l=>[l,[]]))
export const isAlphabet = (str:string)=>{
  if(/^[a-zA-z].*/.test(str)){
    return str.charAt(0).toLocaleUpperCase()
  }
  return null
}


const regxUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/

export const okHref =(str:string|any)=>{
  if(!str) return false
  return regxUrl.test(str)
}

export const throttle = function (
  func: (...args: any) => any,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean },
): () => void {
  let context: any
  let args: any
  let result: any
  let timeout: any
  let previous = 0
  if (!options) options = {}
  const later = function () {
    previous = options?.leading === false ? 0 : +new Date()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  const cbk =  function() {
    const now = +new Date()
    if (!previous && options?.leading === false) previous = now
    // 计算剩余时间
    const remaining = wait - (now - previous)
    // @ts-ignore
    context = this
    // eslint-disable-next-line prefer-rest-params
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options?.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
  return cbk
}