const POWER_KEY = 'power'

export const setPower = (_power:'online'|'offline')=>{
  localStorage[POWER_KEY] = _power
}
export const getPower = ()=>{
  return localStorage[POWER_KEY]
}
export const updatePower = ()=>{
  if (localStorage[POWER_KEY] === 'online') {
    document.documentElement.classList.remove('offline')
    document.documentElement.classList.add('online')
  } else {
    document.documentElement.classList.remove('online')
    document.documentElement.classList.add('offline')
  }
}