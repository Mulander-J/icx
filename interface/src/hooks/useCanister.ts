import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory as idlICX } from './canisters/ICX/ICX.did';
import { idlFactory as idlICXFactory } from './canisters/ICXFactory/ICXFactory.did';
import { idlFactory as idlCycle } from './canisters/Cycle/cycle.did'
// CANISTER_ID is replaced by webpack based on node environment
import { cidICX,cidICXFactory } from './canisters'

/**
 * 
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./ICXFactory.did.js")._SERVICE>}
 */
 export const createActor = (canisterId:string, idl:any,options?:any) => {
  const agent = new HttpAgent({ ...options?.agentOptions });
  
  // Fetch root key for certificate validation during development
  if(process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err=>{
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idl, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};
  
/**
 * A ready-to-use agent for the ICXFactory canister
 */
 export const InsICX = createActor(cidICX, idlICX);

 export const InsICXFactory = createActor(cidICXFactory, idlICXFactory);

 export const InsCycle = (cycle:string)=>createActor(cycle, idlCycle);