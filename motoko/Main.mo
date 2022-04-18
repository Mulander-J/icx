import ExperimentalCycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import User "./types/User";
import Work "./types/Work";
import XN "./modules/XNode";
import DT "./modules/DateTime";
import Base "./types/Base";

shared({ caller = _owner }) actor class ICX() {
  //  Static val
  private let TITLE_MAX = 10;
  private let MODIFY_POINT = 10;
  // private let MODIFY_LIMIT = 5_000_000_000;
  private let MODIFY_LIMIT = 1_000_000_000;
  //  Actor Worker
  private let _wk : Work.WorkInstance = actor("hozae-racaq-aaaaa-aaaaa-c");
  //  Lite User Data & Entries
  private stable var _userEntries : [(Principal, User.UserInfo)] = [];
  private var _addrUserMap = HashMap.fromIter<Principal, User.UserInfo>(_userEntries.vals(), 10, Principal.equal, Principal.hash);
  //  Collection Data
  private stable var _nextNodeId = 1;
  private stable var _nodes : List.List<XN.Node> = List.nil();

  /*hooks*/

  /// @title IsRunning Checker
  /// @description DApp will stop service when it turns flase
  private func _isRunning() : Bool{
      // Service stopped on every Saturday
      DT.getWeekday(Time.now()) != 6;
  };

  /// @title Check Before Update Call
  /// @description Retrun Node When Validate Passed
  private func _beforeModify(_id : Nat, _main : ?XN.MainInfo, _isAdd: Bool) : Result.Result<XN.Node,Text>{
    if (_isRunning() == false){
       return #err("Service stopped on Sat");
    };

    switch(_main){
      case (?main){
        let titleSize = Text.size(main.title);
        if(Text.size(main.content) == 0){
          return #err("Content cannot be Empty");
        }else if(titleSize == 0){
          return #err("Title cannot be Empty");
        } else if(titleSize > TITLE_MAX){
          return #err("Name length should under "#Nat.toText(TITLE_MAX));
        };
      };
      case _{}
    };

    switch (XN.getNode(_nodes, #item(_id))) {
      case (?item) {
        if(item.lastUpdate - Time.now() > MODIFY_LIMIT or _isAdd){
          return  #ok(item);
        };
        return  #err("Please operate later");    
      };
      case _ {
        return #err("Node not find");
      };
    };
  };

  /// @title Update User Point
  /// @description Auto register while user is new
  private func _updateUser(_key_:Principal, _point_:Nat) : Bool{    
    switch (_addrUserMap.get(_key_)) {
      case (?user) {
         _addrUserMap.put(_key_, {
          id = user.id;
          no = user.no;
          point = user.point+_point_;
        });
        return true;
      };
      case null  {
        _addrUserMap.put(_key_, {
          id = Principal.toText(_key_);
          no = _addrUserMap.size()+1;
          point = _point_;
        });
        return false;
      };
    }
  };

  public func acceptCycles() : async Nat {
      return ExperimentalCycles.accept(ExperimentalCycles.available());
  };

  /*update call*/

  public shared({ caller }) func initialNodes() : async Nat{
    assert (caller == _owner);

    _nextNodeId := 1;

    _nodes := List.push<XN.Node>({
        main = {
          title = "ICX";
          desc = "The X-DApp on IC";
          cover = "";
          content = "Web2sites Organizing-Tool for web2.5ers built by web3ers";
        };
        base = {
          id = _nextNodeId;
          pid = 0;
          pids = [_nextNodeId];
          level = 1;
          isRoot = true;
        };
        authors = [caller];
        lastUpdate = Time.now();
    }, List.nil());

    _nextNodeId += 1;
    
    ignore await _wk.insertLogger(#initial,1,"","",caller);
    
    return List.size(_nodes);
  };

  public shared({ caller }) func addNode( _pid_ : Nat, _main_ : XN.MainInfo) : async Result.Result<Nat,Text>{
    switch (_beforeModify(_pid_, Option.make(_main_), true)){
      case (#ok(item)){
        let level = item.base.level + 1;
        _nodes := List.push<XN.Node>({
          main = _main_;
          base = {
            id = _nextNodeId;
            pid = item.base.id;
            pids = Array.append(item.base.pids,[_nextNodeId]);
            level = level;
            isRoot = false;
          };
          authors = [caller];
          lastUpdate = Time.now();
        }, _nodes);

        _nextNodeId += 1;

        ignore _updateUser(caller, MODIFY_POINT);
        ignore await _wk.insertLogger(#create,level,_main_.title,item.main.title,caller);
        
        return #ok(_nextNodeId);
      };
      case (#err(e)){
        return #err(e);
      };
    };
  };

  public shared({ caller }) func removeNode(_id_ : Nat) : async Result.Result<Bool, Text>{
      switch (_beforeModify(_id_, null,false)){
        case (#ok(item)){
          if(item.base.isRoot == true){
            return #err("Root cannot be removed");
          };

          _nodes := List.filter<XN.Node>(_nodes, func (e){
            return Option.isNull(Array.find<Nat>(e.base.pids, func(n){n==_id_}));
          });

          ignore _updateUser(caller, MODIFY_POINT);
          ignore await _wk.insertLogger(#delete,item.base.level,item.main.title,Nat.toText(_id_),caller);

          return #ok(true);
        };
        case (#err(e)){
          return #err(e);
        };
      };
  };

  public shared({ caller }) func updateNode(_id_ : Nat, _main_ : XN.MainInfo) : async Result.Result<Bool, Text>{
      switch (_beforeModify(_id_, Option.make(_main_),false)){
        case (#ok(item)){
          _nodes := List.map<XN.Node,XN.Node>(_nodes, func (e){
            if(e.base.id == _id_){
              return {
                base = e.base;
                main = _main_;
                authors = XN.addAuthors(e.authors, caller);
                lastUpdate = Time.now();
              };
            };
            return e;
          });

          ignore _updateUser(caller, MODIFY_POINT);
          ignore await _wk.insertLogger(#update,item.base.level,_main_.title,"",caller);

          return #ok(true);
        };
        case (#err(e)){
          return #err(e);
        };
      };
  };

  /*query call*/
  
  public shared query func Users() : async [User.UserInfo]{
    Iter.toArray(_addrUserMap.vals());
  };
  private func UserById(_pid_ : Text) : (Nat, [User.UserInfo]) {
    switch (_addrUserMap.get(Principal.fromText(_pid_))){
      case (?user){
        return (1,[user]);
      };
      case _ {
        return (0,[]);
      };
    };
  };
  public shared query func PageUser(_pgSize_:Nat,_pgNo_:Nat,_pid_:?Text) : async (Nat,[User.UserInfo]){
    switch(_pid_){
      case (?txt){
        UserById(txt);
      };
      case _ {
        Base.getPageArr<User.UserInfo>(_pgSize_,_pgNo_,Iter.toList(_addrUserMap.vals()));
      };
    };
  };
  public shared query func AppInfo() : async ?XN.Node {
    XN.getNode(_nodes, #root);
  };
  public shared query func NodeArrs() : async [XN.Node] {
    List.toArray(_nodes);
  };
  public shared query func NodeByPid(_pid_: Nat) : async [XN.Node] {
    List.toArray(XN.getNodes(_nodes,#pid(_pid_)));
  };
  public query func getCycles() : async Nat {
      ExperimentalCycles.balance();
  };



  /*System Update*/

  system func preupgrade() {
    _userEntries := Iter.toArray(_addrUserMap.entries());
  };

  system func postupgrade() {
    _userEntries := [];
  };
  
  // system func heartbeat() : async () {
  //   if (_heart % 5 == 0) {
  //     await ring();
  //   };
  //   _heart += 1;
  // };
};
