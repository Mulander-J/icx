import { Actor, HttpAgent } from "@dfinity/agent";
// CANISTER_ID is replaced by webpack based on node environment
import { 
  cidICX, cidICXFactory,
  cidIcnRegistry, cidIcnResolver
} from './canisters'
// Imports and re-exports candid interface
import { idlFactory as idlICX } from './canisters/ICX/ICX.did';
import { idlFactory as idlICXFactory } from './canisters/ICXFactory/ICXFactory.did';
import { idlFactory as idlCycle } from './canisters/Cycle/cycle.did'

import idlIcnRegistry from './canisters/ICNaming/registry.did.js'
import idlIcnResolve from './canisters/ICNaming/resolve.did.js'

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
 * Create with agent from wallet providers
 */

export const InsCycle = (cid:string)=>createActor(cid, idlCycle, null)

export const getInsICX = (agent:any)=>createActor(cidICX, idlICX, agent)
export const getInsICXFactory = (agent:any)=>createActor(cidICXFactory, idlICXFactory, agent)


/**
 * A ready-to-use agent for the ICXs canister
 */

export const InsICX = getInsICX(null)
export const InsICXFactory = getInsICXFactory(null)

export const InsIcnRegistry = createActor(cidIcnRegistry, idlIcnRegistry, null)
export const InsIcnResolve = createActor(cidIcnResolver, idlIcnResolve, null)
