import AID "../modules/AID/AccountId";
module{
  public type UserInfo = {
    id: Text;
    account: AID.Address;
    no: Nat;
    point: Nat;
    alias: Text;
  };
};