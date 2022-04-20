export const cidICX = process.env.ICX_CANISTER_ID as string;
export const cidICXFactory = process.env.ICXFACTORY_CANISTER_ID as string;
export const cidICXInterface = process.env.ICXINTERFACE_CANISTER_ID as string;
 
export const CanisterList = [
  {key:'icx',label:'ICX',desc:'The core program of icx.',canisterId:cidICX},
  {key:'icxFactory',label:'ICX FACTORY',desc:'The logger & tools of icx.',canisterId:cidICXFactory},
  {key:'interface',label:'INTERFACE',desc:'The front canister of icx.',canisterId:cidICXInterface},
]