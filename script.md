# initial script

```bash
#!/bin/bash

wallet="yz336-daaaa-aaaal-qag3a-cai"

icx="jki7y-niaaa-aaaal-qaw2a-cai"
icxFactory='jnjzm-aqaaa-aaaal-qaw2q-cai'

# setMainCanisterId for factory
dfx canister --network=ic --wallet=$wallet call $icxFactory setMainCanisterId '("'$icx'")'

# Empty Data
dfx canister --network=ic --wallet=$wallet call $icxFactory EmptyLogger
dfx canister --network=ic --wallet=$wallet call $icxFactory EmptyFeedbacks


# setWorker for Main
dfx canister --network=ic --wallet=$wallet call $icx setWorkActor '("'$icxFactory'")'

# Initial Nodes
dfx canister --network=ic call $icx initialNodes


#start
dfx canister --network=ic start --all
#Stop
dfx canister --network=ic stop --all
#Delete
dfx canister --network=ic delete --all

```