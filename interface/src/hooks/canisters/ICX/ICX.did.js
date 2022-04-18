export const idlFactory = ({ IDL }) => {
  const BaseInfo = IDL.Record({
    'id' : IDL.Nat,
    'pid' : IDL.Nat,
    'pids' : IDL.Vec(IDL.Nat),
    'isRoot' : IDL.Bool,
    'level' : IDL.Nat,
  });
  const MainInfo = IDL.Record({
    'title' : IDL.Text,
    'content' : IDL.Text,
    'desc' : IDL.Text,
    'cover' : IDL.Text,
  });
  const Time = IDL.Int;
  const Node = IDL.Record({
    'base' : BaseInfo,
    'main' : MainInfo,
    'lastUpdate' : Time,
    'authors' : IDL.Vec(IDL.Principal),
  });
  const UserInfo = IDL.Record({
    'id' : IDL.Text,
    'no' : IDL.Nat,
    'point' : IDL.Nat,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const ICX = IDL.Service({
    'AppInfo' : IDL.Func([], [IDL.Opt(Node)], ['query']),
    'NodeArrs' : IDL.Func([], [IDL.Vec(Node)], ['query']),
    'NodeByPid' : IDL.Func([IDL.Nat], [IDL.Vec(Node)], ['query']),
    'PageUser' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Opt(IDL.Text)],
        [IDL.Nat, IDL.Vec(UserInfo)],
        ['query'],
      ),
    'Users' : IDL.Func([], [IDL.Vec(UserInfo)], ['query']),
    'acceptCycles' : IDL.Func([], [IDL.Nat], []),
    'addNode' : IDL.Func([IDL.Nat, MainInfo], [Result_1], []),
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'initialNodes' : IDL.Func([], [IDL.Nat], []),
    'removeNode' : IDL.Func([IDL.Nat], [Result], []),
    'updateNode' : IDL.Func([IDL.Nat, MainInfo], [Result], []),
  });
  return ICX;
};
export const init = ({ IDL }) => { return []; };
