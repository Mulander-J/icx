export const idlFactory = ({ IDL }) => {
  const Cycle = IDL.Service({    
    'acceptCycles' : IDL.Func([], [IDL.Nat], []),
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
  });
  return Cycle;
};
export const init = ({ IDL }) => { return []; };
