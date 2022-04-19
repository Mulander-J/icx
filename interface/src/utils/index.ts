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