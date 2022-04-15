export enum MessageType {
  INFO,
  SUCCESS,
  WARN,
  ERROR,
}
export type Message = {
  key : string,
  type : MessageType,
  text : string|any
}
export const INITIAL_MSG = {
  key: 'initial',
  type: MessageType.INFO,
  text: 'Welcome!'
}