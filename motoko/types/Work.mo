import Principal "mo:base/Principal";
import Time "mo:base/Time";
module{
  /*Feedback*/
  public type IssueType = {
    #bug;
    #feature;
    #suggestion;
  };
  public type FeedbackBody = {
    group: IssueType;
    message: Text;
    timestamp: Time.Time;
    opreator: Principal;
  };
  /*EventLogger*/
  public type WorkType = {
    #initial;
    #create;
    #delete;
    #update;    
  };
  public type WorkEvent = {
    level: Nat;
    work: WorkType;
    content: Text;
    ref: Text;
    timestamp: Time.Time;
    opreator: Text;
  };
  public type WorkInstance = actor {
    insertLogger : (
        _work_: WorkType,
        _level_: Nat,
        _content_: Text,
        _ref_: Text,
        _op_: Principal,      
    ) -> async Int;
  };
};