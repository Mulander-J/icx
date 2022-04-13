const DARK_KEY = 'dark'

export const setDark = (_theme:'dark'|'light')=>{
  localStorage[DARK_KEY] = _theme
}
export const getDark = ()=>{
  return localStorage[DARK_KEY]
}
export const updateDark = ()=>{
  if (localStorage[DARK_KEY] === 'dark' || (!(DARK_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}