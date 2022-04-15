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
    group: Text;
    message: Text;
    timestamp: Time.Time;
    opreator: Text;
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
    work: Text;
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

  public func wtToText(_wt_: WorkType) : Text {
    switch _wt_ {
        case (#initial) {"initial"};
        case (#create) {"create"};
        case (#delete) {"delete"};
        case (#update) {"update"};
    };
  };

  public func itToText(_it_: IssueType) : Text {
    switch _it_ {
        case (#bug) {"bug"};
        case (#feature) {"feature"};
        case (#suggestion) {"suggestion"};
    };
  };
};