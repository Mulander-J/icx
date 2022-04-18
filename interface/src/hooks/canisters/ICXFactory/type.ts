import type { Principal } from '@dfinity/principal';
export interface FeedbackBody {
  'group' : string,
  'message' : string,
  'timestamp' : Time,
  'opreator' : string,
}
export interface ICXFactory {
  'EmptyFeedbacks' : () => Promise<bigint>,
  'EmptyLogger' : () => Promise<bigint>,
  'Feedbacks' : () => Promise<Array<FeedbackBody>>,
  'Mainner' : () => Promise<Principal>,
  'Owner' : () => Promise<Principal>,
  'PageFeedback' : (arg_0: bigint, arg_1: bigint) => Promise<
      [bigint, Array<FeedbackBody>]
    >,
  'PageWorkEvent' : (arg_0: bigint, arg_1: bigint) => Promise<
      [bigint, Array<WorkEvent>]
    >,
  'WorkEvents' : () => Promise<Array<WorkEvent>>,
  'acceptCycles' : () => Promise<bigint>,
  'getCycles' : () => Promise<bigint>,
  'insertFeedback' : (arg_0: IssueType, arg_1: string) => Promise<bigint>,
  'insertLogger' : (
      arg_0: WorkType,
      arg_1: bigint,
      arg_2: string,
      arg_3: string,
      arg_4: Principal,
    ) => Promise<bigint>,
  'setMainCanisterId' : (arg_0: string) => Promise<Principal>,
  'setOwner' : (arg_0: string) => Promise<Principal>,
}
export type IssueType = { 'bug' : null } |
  { 'feature' : null } |
  { 'suggestion' : null };
export type Time = bigint;
export interface WorkEvent {
  'ref' : string,
  'content' : string,
  'work' : string,
  'level' : bigint,
  'timestamp' : Time,
  'opreator' : string,
}
export type WorkType = { 'delete' : null } |
  { 'create' : null } |
  { 'update' : null } |
  { 'initial' : null };
export interface _SERVICE extends ICXFactory {}
