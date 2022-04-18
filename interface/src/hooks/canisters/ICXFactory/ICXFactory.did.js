export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const FeedbackBody = IDL.Record({
    'group' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : Time,
    'opreator' : IDL.Text,
  });
  const WorkEvent = IDL.Record({
    'ref' : IDL.Text,
    'content' : IDL.Text,
    'work' : IDL.Text,
    'level' : IDL.Nat,
    'timestamp' : Time,
    'opreator' : IDL.Text,
  });
  const IssueType = IDL.Variant({
    'bug' : IDL.Null,
    'feature' : IDL.Null,
    'suggestion' : IDL.Null,
  });
  const WorkType = IDL.Variant({
    'delete' : IDL.Null,
    'create' : IDL.Null,
    'update' : IDL.Null,
    'initial' : IDL.Null,
  });
  const ICXFactory = IDL.Service({
    'EmptyFeedbacks' : IDL.Func([], [IDL.Nat], []),
    'EmptyLogger' : IDL.Func([], [IDL.Nat], []),
    'Feedbacks' : IDL.Func([], [IDL.Vec(FeedbackBody)], ['query']),
    'Mainner' : IDL.Func([], [IDL.Principal], ['query']),
    'Owner' : IDL.Func([], [IDL.Principal], ['query']),
    'PageFeedback' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Nat, IDL.Vec(FeedbackBody)],
        ['query'],
      ),
    'PageWorkEvent' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Nat, IDL.Vec(WorkEvent)],
        ['query'],
      ),
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
