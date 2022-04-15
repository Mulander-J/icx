import { BigNumber } from 'bignumber.js';

const mtkTime = (value:bigint|number|any)=>{
  return new Date(Math.floor(new BigNumber(value).toNumber()/1e6))
}

export default {
  currencyUSD(value:string|number) {
    return '$' + value
  },
  frBN(n:bigint){return Number(n)},
  mtkTime,
  dateStr:(t:bigint|number|any)=>mtkTime(t).toISOString(),
  strSlice: (str: string, front = 10, behind = 4): string => {
    if (typeof str !== 'string' || str.length === 0) return ''
    if (front + behind >= str.length) return str
    return `${str.slice(0, front)}${front < str.length ? '...' : ''}${
      behind === 0 ? '' : str.slice(-behind)
    }`
  }
}

// https://dashboard.internetcomputer.org/account/c12f2ae8518172d965a0e504e2a1e9d492435c3226ede2616b1b9492b93b2805