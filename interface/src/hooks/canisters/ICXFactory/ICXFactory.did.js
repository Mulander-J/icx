export const idlFactory = ({ IDL }) => {
  const IssueType = IDL.Variant({
    'bug' : IDL.Null,
    'feature' : IDL.Null,
    'suggestion' : IDL.Null,
  });
  const Time = IDL.Int;
  const FeedbackBody = IDL.Record({
    'group' : IssueType,
    'message' : IDL.Text,
    'timestamp' : Time,
    'opreator' : IDL.Principal,
  });
  const WorkType = IDL.Variant({
    'delete' : IDL.Null,
    'create' : IDL.Null,
    'update' : IDL.Null,
    'initial' : IDL.Null,
  });
  const WorkEvent = IDL.Record({
    'ref' : IDL.Text,
    'content' : IDL.Text,
    'work' : WorkType,
    'level' : IDL.Nat,
    'timestamp' : Time,
    'opreator' : IDL.Text,
  });
  const ICXFactory = IDL.Service({
    'EmptyFeedbacks' : IDL.Func([], [IDL.Nat], []),
    'EmptyLogger' : IDL.Func([], [IDL.Nat], []),
    'Feedbacks' : IDL.Func([], [IDL.Vec(FeedbackBody)], ['query']),
    'Mainner' : IDL.Func([], [IDL.Principal], ['query']),
    'Owner' : IDL.Func([], [IDL.Principal], ['query']),
    'WorkEvents' : IDL.Func([], [IDL.Vec(WorkEvent)], ['query']),
    'acceptCycles' : IDL.Func([], [IDL.Nat], []),
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'insertFeedback' : IDL.Func([IssueType, IDL.Text], [IDL.Nat], []),
    'insertLogger' : IDL.Func(
        [WorkType, IDL.Nat, IDL.Text, IDL.Text, IDL.Principal],
        [IDL.Int],
        [],
      ),
    'setMainCanisterId' : IDL.Func([IDL.Text], [IDL.Principal], []),
    'setOwner' : IDL.Func([IDL.Text], [IDL.Principal], []),
  });
  return ICXFactory;
};
export const init = ({ IDL }) => { return []; };
