import { BigNumber } from 'bignumber.js'
import { Principal } from '@dfinity/principal'
import crc32 from "crc-32"
import { sha224 } from "js-sha256"

export const frBN = (n:any)=>new BigNumber(n).toNumber()

const mtkTime = (value:bigint|number|any)=>new Date(Math.floor(frBN(value)/1e6))

export const txt2Principal = (text:string)=>Principal.fromText(text)

export const isPrincipal = (txt:string)=>{
  try{
    let _p = Principal.fromText(txt) 
    return _p._isPrincipal
  }catch(e){
    return false
  }
}
export const bytesToHex = function (bytes:any[]) {
  for (var hex:any = [], i = 0; i < bytes.length; i++) {
      hex.push((bytes[i] >>> 4).toString(16));
      hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}
export const principalToAccountId = (prinStr:string, subaccount:any)=> {
  try{
    const principal = Principal.fromText(prinStr)
    const shaObj = sha224.create();
    shaObj.update("\x0Aaccount-id");
    shaObj.update(principal.toUint8Array());
    shaObj.update(subaccount ? subaccount : new Uint8Array(32));
    const hash = new Uint8Array(shaObj.array());
    const crc = crc32.buf(hash);
    const bytes:any = [
      (crc >> 24) & 0xff,
      (crc >> 16) & 0xff,
      (crc >> 8) & 0xff,
      crc & 0xff,
      ...hash,
    ];

    return bytesToHex(bytes)
  }catch(err){
    return ''
  }
}

export default {
  frBN,
  mtkTime,
  dateStr:(t:bigint|number|any)=>mtkTime(t).toISOString(),
  strSlice: (str: string, front = 6, behind = 3): string => {
    if (typeof str !== 'string' || str.length === 0) return ''
    if (front + behind >= str.length) return str
    return `${str.slice(0, front)}${front < str.length ? '...' : ''}${
      behind === 0 ? '' : str.slice(-behind)
    }`
  },
  accountExplor:(id:string)=>{
    return `https://dashboard.internetcomputer.org/account/${id}`
  },
  rockExplor:(cid:string)=>{
    return `https://ic.rocks/principal/${cid}`
  }
}
