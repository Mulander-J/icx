import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Work "./types/Work";
import Base "./types/Base";

shared(msg) actor class ICXFactory() {
    /*define var*/
  
    //  CansiterIds
    private var _owner : Principal = msg.caller;
    // private var _mainCanisterId : Principal = Principal.fromText("ai7t5-aibaq-aaaaa-aaaaa-c");
    private var _mainCanisterId : Principal = Principal.fromText("jki7y-niaaa-aaaal-qaw2a-cai");
    //  Feedback Data
    private stable var _feedbacks: List.List<Work.FeedbackBody> = List.nil();
    //  Logger Data
    private stable var _loggers: List.List<Work.WorkEvent> = List.nil();

    /*hooks*/

    private func _onlyOwner(_caller: Principal) {
        assert(_caller == _owner);
    };
    
    /*update call*/

    public func acceptCycles(_c: Nat) : async Nat {
        let amount = Cycles.available();
        
        if(amount == 0) return 0;
        
        let acceptable =
            if (_c <= amount and _c > 0) _c
            else amount;

        return Cycles.accept(acceptable);
    };

    public shared({ caller }) func setOwner(_owner_ : Text) : async Principal{
        _onlyOwner(caller);
        _owner := Principal.fromText(_owner_);
        return _owner;
    };
    public shared({ caller }) func setMainCanisterId(_main_ : Text) : async Principal {
        _onlyOwner(caller);
        _mainCanisterId := Principal.fromText(_main_);
        return _mainCanisterId;
    };
    
    public shared({ caller }) func EmptyLogger() : async Nat{
        _onlyOwner(caller);
        _loggers := List.nil();
        return List.size(_loggers);
    };
    public shared({ caller }) func EmptyFeedbacks() : async Nat{
        _onlyOwner(caller);
        _feedbacks := List.nil();
        return List.size(_feedbacks);
    };    
    public shared({ caller }) func insertFeedback(
        _group_: Work.IssueType,
        _message_: Text
    ) : async Nat {
        _feedbacks := List.push<Work.FeedbackBody>(
            {
                group = Work.itToText(_group_);
                message = _message_;
                timestamp = Time.now();
                opreator = Principal.toText(caller);
            },
            _feedbacks
        );
        return List.size(_feedbacks);
    };
    public shared({ caller }) func insertLogger(        
        _work_: Work.WorkType,
        _level_: Nat,
        _content_: Text,
        _ref_:Text,
        _op_: Principal,      
    ) : async Int {
        if( caller == _mainCanisterId){
            _loggers := List.push<Work.WorkEvent>(
                {
                    level = _level_;
                    work = Work.wtToText(_work_);
                    content = _content_;                    
                    ref = _ref_;
                    timestamp = Time.now();
                    opreator = Principal.toText(_op_);
                },
                _loggers
            );
            return List.size(_loggers);
        };
        return -1;
    };

    /*query call*/

    public shared query func Feedbacks() :async [Work.FeedbackBody]{
        List.toArray(_feedbacks);
    };
    public shared query func WorkEvents() :async [Work.WorkEvent]{
        List.toArray(_loggers);
    };
    public shared query func PageFeedback(_pgSize_:Nat,_pgNo_:Nat) :async (Nat,[Work.FeedbackBody]){
        Base.getPageArr<Work.FeedbackBody>(_pgSize_,_pgNo_,_feedbacks);
    };
    public shared query func PageWorkEvent(_pgSize_:Nat,_pgNo_:Nat) :async (Nat,[Work.WorkEvent]){
        Base.getPageArr<Work.WorkEvent>(_pgSize_,_pgNo_,_loggers);
    };
    public shared query func Owner() :async Principal{
        _owner;
    };
    public shared query func Mainner() :async Principal{
        _mainCanisterId;
    };
    public query func getCycles() : async Nat {
        Cycles.balance();
    };
};