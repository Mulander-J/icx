import List "mo:base/List";
module{
  public func getPage(_pgSize_:Nat,_pgNo_:Nat) : (Nat,Nat){
    var _pgs = _pgSize_;
    if(_pgs <=1){
        _pgs := 10;
    };
    var _pgn = _pgNo_;
    if(_pgn==0){
        _pgn := 1;
    }else{
        _pgn := _pgNo_ -1
    };
    return (_pgs,_pgn)
  };
  public func getPageArr<X>(_pgSize_:Nat,_pgNo_:Nat,_l:List.List<X>) : (Nat,[X]) {
      let (_pgs,_pgn) = getPage(_pgSize_,_pgNo_);
      let _chunks:List.List<List.List<X>> = List.chunks<X>(_pgs,_l);
      let tol = List.size(_l);
      switch (List.get(_chunks, _pgn)){
          case (?list){
              return (tol,List.toArray(list));
          };
          case _ {
              return (tol,[]);
          };
      };
  };
}