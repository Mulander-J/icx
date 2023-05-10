# ICX Bookmarker

Bookmark manager at IC.

## Brain Strom

### Intro

The ICX is regard as a tool or station, where **users** can **manage** **bookmarks** via **Internet Computer**.

### Split

| Word | Nature | Extend |
|---|---|---|
| User | target | CRUD |
| Bookmarks | target | CRUD |
| Manage | Action | Log, User Point, ... |
| IC | Netowork/Framework | Motoko |

### Topic

### 3D Model

New Design Trend

### Reduce Using App

> Don't get addicted to any app.

Stop service at every Saturday. **Instead**. Go to a cinema with your family.

### Story

- User.CRUD
- Bookmark.CRUD
- Logger
- User Rank
- 3dModel
- Saturday-Stop-Service

## Setup

>Refrence [ICTexas-UI(NnsDao)](https://github.com/NnsDao/ICTexas-UI)

### Services/Canister

- Factory
- MainEntry
- Interface

## Skill Stack

- Network: Internet Computer
- Backend: Motoko
- Frontend: Vue+Vite+Ts+Tailwind

## Data Struct

```motoko
// <Object>User
UserInfo {
  id: Text; // pid
  account: AID.Address; // aid ≈ uuid
  no: Nat; // increatment id
  point: Nat;
  alias: Text;
}

// <Object>Bookmark ArrayTree
Node {
  base: {
    id: Nat;
    pid: Nat;
    pids: [Nat];
    level: Nat;
    isRoot: Bool;
  };
  main: {
    title: Text;
    desc: Text;
    cover: Text;
    content: Text;
  };
  authors: [Text];
  lastUpdate: Time.Time;
}

WorkEvent {
  level: Nat;
  work: Text;
  content: Text;
  ref: Text;
  timestamp: Time.Time;
  opreator: Text;
}
```

## Setup backend

- Logger CRD
- Main-Factory
- User CRUD
- Node CRUD
