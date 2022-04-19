import Array "mo:base/Array";
import List "mo:base/List";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

module{
  private type BaseInfo = {
    id: Nat;
    pid: Nat;
    pids: [Nat];
    level: Nat;
    isRoot: Bool;
  };
  public type MainInfo = {
    title: Text;
    desc: Text;
    cover: Text;
    content: Text;
  };
  public type Node = {
    base: BaseInfo;
    main: MainInfo;
    authors: [Text];
    lastUpdate: Time.Time;  
  };

  public func getNode( _tar : List.List<Node>, _getN_ : {#root; #item : (Nat);}) : ?Node {        
      switch _getN_ {
          case (#root) {
              return List.find<Node>(_tar, func (e){e.base.isRoot == true});
          };
          case (#item _id) {
              return List.find<Node>(_tar, func (e){e.base.id == _id});
          };
      };
  };
  public func getNodes( _tar : List.List<Node>, _getN_ : {#pid : (Nat); #level : (Nat);}) : List.List<Node> {        
      switch _getN_ {
          case (#pid _p) {
            return List.filter<Node>(_tar, func (e){e.base.pid == _p});
          };
          case (#level _l) {
              return List.filter<Node>(_tar, func (e){e.base.level == _l});
          };
      };
  };
  public func addAuthors( _tar_ : [Text], _id_: Principal) : [Text] {
      let _p = Principal.toText(_id_);
      if(Option.isNull(Array.find<Text>(_tar_, func (e){e==_p}))){
        return Array.append<Text>(_tar_, [_p]);
      }else{
        _tar_;
      }
  };
};