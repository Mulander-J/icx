export default ({ IDL }) => {
  const ErrorInfo = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const GetPageInput = IDL.Record({
    'offset' : IDL.Nat64,
    'limit' : IDL.Nat64,
  });
  const GetPageOutput = IDL.Record({ 'items' : IDL.Vec(IDL.Text) });
  const GetControlledNamesResponse = IDL.Variant({
    'Ok' : GetPageOutput,
    'Err' : ErrorInfo,
  });
  return IDL.Service({
    'get_controlled_names' : IDL.Func(
        [IDL.Principal, GetPageInput],
        [GetControlledNamesResponse],
        ['query'],
      )
  });
};
export const init = ({ IDL }) => { return []; };