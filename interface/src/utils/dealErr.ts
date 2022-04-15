interface CanisterErr extends Error {
  canisterId: any; // Principal 
  type: string; // query|update
  methodName: string,
  props: {
    Status:string,
    Code:string,
    Message:string
  },
  result: {
    status:string,
    reject_code:string,
    reject_message:string
  },
}


const dealErr = (err: CanisterErr) => {
  let msg : string = ''
  if(err.canisterId){
    if(err.props.Status === 'rejected'){
        const _code = err.props.Code
        switch (_code){
          case 'DestinationInvalid':
            msg = 'DestinationInvalid'
            break;
          default:
            msg = err.props.Message
        }
    }
  }else{
    msg = err.message
  }
  return msg || 'System Error'
}
export default dealErr