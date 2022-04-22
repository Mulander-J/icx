import { Actor, HttpAgent } from "@dfinity/agent";
// CANISTER_ID is replaced by webpack based on node environment
import { cidICX,cidICXFactory } from './canisters'
// Imports and re-exports candid interface
import { idlFactory as idlICX } from './canisters/ICX/ICX.did';
import { idlFactory as idlICXFactory } from './canisters/ICXFactory/ICXFactory.did';
import { idlFactory as idlCycle } from './canisters/Cycle/cycle.did'

export const createActor = (canisterId:string, idl:any, existAgent:any,options?:any)=>{
  const agent = existAgent || new HttpAgent({ ...options?.agentOptions })
  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idl, {
    agent,
    canisterId,
    ...options?.actorOptions,
  })
}

  
/**
 * A ready-to-use agent for the ICXs canister
 */
export const InsCycle = (cid:string)=>createActor(cid, idlCycle, null)

export const getInsICX = (agent:any)=>createActor(cidICX, idlICX, agent)
export const getInsICXFactory = (agent:any)=>createActor(cidICXFactory, idlICXFactory, agent)

export const InsICX = getInsICX(null)
export const InsICXFactory = getInsICXFactory(null)
