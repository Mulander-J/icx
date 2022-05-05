```

          _____                    _____                                  
         /\    \                  /\    \                 ______          
        /::\    \                /::\    \               |::|   |         
        \:::\    \              /::::\    \              |::|   |         
         \:::\    \            /::::::\    \             |::|   |         
          \:::\    \          /:::/\:::\    \            |::|   |         
           \:::\    \        /:::/  \:::\    \           |::|   |         
           /::::\    \      /:::/    \:::\    \          |::|   |         
  ____    /::::::\    \    /:::/    / \:::\    \         |::|   |         
 /\   \  /:::/\:::\    \  /:::/    /   \:::\    \  ______|::|___|___ ____ 
/::\   \/:::/  \:::\____\/:::/____/     \:::\____\|:::::::::::::::::|    |
\:::\  /:::/    \::/    /\:::\    \      \::/    /|:::::::::::::::::|____|
 \:::\/:::/    / \/____/  \:::\    \      \/____/  ~~~~~~|::|~~~|~~~      
  \::::::/    /            \:::\    \                    |::|   |         
   \::::/____/              \:::\    \                   |::|   |         
    \:::\    \               \:::\    \                  |::|   |         
     \:::\    \               \:::\    \                 |::|   |         
      \:::\    \               \:::\    \                |::|   |         
       \:::\____\               \:::\____\               |::|   |         
        \::/    /                \::/    /               |::|___|         
         \/____/                  \/____/                 ~~              
                                                                          
                                                                              
```
# ICX

> [Mainnet App](https://jeksq-wyaaa-aaaal-qaw3a-cai.ic0.app/)

> Cycle Manage: Func `acceptCycles(_c:Nat)`

`Web2sites` Organizing-Tool for `web2.5ers` built by `web3ers`.

## License

/

## Product Rule

### Intro

The ICX is regard as a tool or station, where users can manage bookmarks via Internet Computer.

### Features

Supported

- Home: Manage Bookmarks
- Rank: Show User Point
- Activity: Show loggers
- Feedback: Send report
- About: Intro of app
- Tool: Principal to account
- Identity: Internet Identity & Plug
- Dark/Light mode switch
- Readonly/Write mode switch

Coming Soon

- Vote
- ICNS
- Profile Picture

### Roles

User will access all rights to post/update/delete any contents.

Therefor comes out several roles.

A.Good
- Write content with high quality.
- Clean the spam, fake, ad...

B.Bad
- Post content for personal benefits.
- Delete good content for fun.

C.Neutral
- Content review.
- Give rewards and punishments.
- Apply permanent(can't be delete).

### Build with Community

- UNI(You Name It)
The appInfo(name,desc,cover...) is open to modify for all users.
- Feedback
The feedback integration allowed user to send reports.
- EventLogger
Every action will output a log for public & transparency.
- DAO
Maybe DAO in the future.

### Reduce Using App

> Don't get addicted to this app.

- Stop service at every Saturday. **Instead**. Go to a cinema with your family.
- Maybe empty data regularly. **Instead**. Use old way to reinforcing memory.

## Design Rule

### KeyWords

- Letter: ICX
- Adjectives: Elegant, Environmental
- figurative: Crystal, Silk

### Theme Color

| Color            | Hex                                                              |
| ---------------- | ---------------------------------------------------------------- |
| Background       | ![#e81a91](https://via.placeholder.com/10/e81a91?text=+)![#c865b3](https://via.placeholder.com/10/c865b3?text=+)![#978cd8](https://via.placeholder.com/10/978cd8?text=+)![#03acfd](https://via.placeholder.com/10/03acfd?text=+)|
| Primay SKY       | ![#0ea5e9](https://via.placeholder.com/10/0ea5e9?text=+) #0ea5e9 |
| Primay ROSE      | ![#f43f5e](https://via.placeholder.com/10/f43f5e?text=+) #f43f5e |
| Highlight AMBER  | ![#f59e0b](https://via.placeholder.com/10/f59e0b?text=+) #f59e0b |
| Info BLUE  | ![#60a5fa](https://via.placeholder.com/10/60a5fa?text=+) #60a5fa |
| Success GREEN  | ![#4ade80](https://via.placeholder.com/10/4ade80?text=+) #4ade80 |
| Warn AMBER  | ![#fbbf24](https://via.placeholder.com/10/fbbf24?text=+) #fbbf24 |
| Error ROSE  | ![#fb7185](https://via.placeholder.com/10/fb7185?text=+) #fb7185 |

### Brand Logo

> Just for intro, not Commercial

- Dfinity-LOGO

![dfinity](/docs/dfinity.svg)

- ICX-LOGO

![icx](/docs/logo.svg)

- LOADING

![loading](/docs/human.gif)

### Figma Sketch

![figma_1](/docs/figma_1.png)

![figma_2](/docs/figma_2.png)

![figma_3](/docs/figma_3.png)

## Tech Rule

### Skill Stack

- Network: Internet Computer
- Backend: Motoko
- Frontend: Vue+Vite+Ts+Tailwind

### Services/Canister

#### 1.ICX

Core: `jki7y-niaaa-aaaal-qaw2a-cai`

- User
- Node
  - AppInfo(Root:Lv1)
  - Collection(Lv2)
  - Bookmark(Lv3)

#### 2.Factory

Factory: `jnjzm-aqaaa-aaaal-qaw2q-cai`

- Feedback
- EventLogger

#### 3.ICXInterface

Frontend: `jeksq-wyaaa-aaaal-qaw3a-cai`

#### 4.NFT 

// coming soon

#### 5.Token

// coming soon

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_APP_DFX_NETWORK`

### Commands

Local Run

```bash
#1.enter icx
cd icx
#2.Remove ICXInterface in dfx.json
#3.start local net
dfx start
#4.deploy backend
dfx deploy
#5.initial Data with your wallet
dfx canister call ICX initialNodes
#6.enter icx/interface
cd /interface
#7.bootstrap & can skip if already installed
npm i
#8 run frontend
npm run dev
```

### Directory Structure

Front and back-end separation

```bash
icx
├ interface   # Frontend
│ ├ dist    # build files
│ ├ public    # static assets
│ │ ├ assets   # img,fonts,mp3...
│ │ ├ components   # global widget
│ │ ├ directives   # global directive
│ │ ├ hooks   # Module Func
│ │ ├ layout   # layout widget
│ │ ├ model   # data types
│ │ ├ plugin   # plugins register
│ │ ├ router   # vue-router
│ │ ├ store   # vuex:pinia
│ │ ├ styles   # css
│ │ ├ utils   # tools
│ │ ├ views   # pages
│ │ ├ App.vue   # Main Template
│ │ └ main.ts   # Main Entry
│ ├ src   # source code
│ ├ index.html    # page entry
│ ├ ...
│ ├ tailwind.config.js    #tailwin config
│ └ vite.config.ts    # vite-config like webpack
├ motoko    # Backend
│ ├ modules   # Tools 
│ │ ├ AID   # AccountId Tools
│ │ ├ DateTime.mo   # DateTime Tools
│ │ └ XNODe.mo    # XNode Tools
│ ├ types   # Types
│ ├ Factory.mo    # Factory-Entry
│ └ Main.mo   # Main-Entry
│ ...
```

### Data & Type

Public Data on Internet Computer

```
UserInfo {
  id: Text;
  account: AID.Address;
  no: Nat;
  point: Nat;
  alias: Text;
}

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

FeedbackBody {
  group: Text;
  message: Text;
  timestamp: Time.Time;
  opreator: Text;
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


## Authors

- [@Mulander-J](https://github.com/Mulander-J)

## Feedback

If you have any feedback, please reach out to me at mulander_j@outlook.com

## Contributing

Contributions are always welcome!