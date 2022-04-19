import type { Principal } from '@dfinity/principal';
export type Address = string;
export interface BaseInfo {
  'id' : bigint,
  'pid' : bigint,
  'pids' : Array<bigint>,
  'isRoot' : boolean,
  'level' : bigint,
}
export interface ICX {
  'AppInfo' : () => Promise<[] | [Node]>,
  'NodeArrs' : () => Promise<Array<Node>>,
  'NodeByPid' : (arg_0: bigint) => Promise<Array<Node>>,
  'PageUser' : (arg_0: bigint, arg_1: bigint, arg_2: [] | [string]) => Promise<
      [bigint, Array<UserInfo>]
    >,
  'Users' : () => Promise<Array<UserInfo>>,
  'acceptCycles' : () => Promise<bigint>,
  'addNode' : (arg_0: bigint, arg_1: MainInfo) => Promise<Result_1>,
  'getCycles' : () => Promise<bigint>,
  'initialNodes' : () => Promise<bigint>,
  'removeNode' : (arg_0: bigint) => Promise<Result>,
  'updateNode' : (arg_0: bigint, arg_1: MainInfo) => Promise<Result>,
}
export interface MainInfo {
  'title' : string,
  'content' : string,
  'desc' : string,
  'cover' : string,
}
export interface Node {
  'base' : BaseInfo,
  'main' : MainInfo,
  'lastUpdate' : Time,
  'authors' : Array<Principal>,
}
export type Result = { 'ok' : boolean } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface UserInfo {
  'id' : string,
  'no' : bigint,
  'alias' : string,
  'account' : Address,
  'point' : bigint,
}
export interface _SERVICE extends ICX {}
