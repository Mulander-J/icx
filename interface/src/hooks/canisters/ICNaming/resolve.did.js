export default ({ IDL }) => {
  const ErrorInfo = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const GetRecordValueResponse = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'Err' : ErrorInfo,
  });
  return IDL.Service({    
    'get_record_value' : IDL.Func(
        [IDL.Text],
        [GetRecordValueResponse],
        ['query'],
      )
  });
};
export const init = ({ IDL }) => { return []; };