import { BigNumber } from 'bignumber.js';

export default {
  currencyUSD(value:string|number) {
    return '$' + value
  },
  frBN(n:bigint){return Number(n)},
  mtkTime(value:bigint|number|any){
    return new Date(Math.floor(new BigNumber(value).toNumber()/1e6))
  }
}