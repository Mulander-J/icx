export const getServeRunning = ()=>{
  const weekDay = new Date().getDay()
  return weekDay !== 6
}