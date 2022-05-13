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

## Inspiration

Even though I have hundreds of bookmarks, no more than 20 of them are really useful at the same time.
And I was tired of manage bookmarks from browser to browser. I think my way managing links may not effective enough.
Thus I tried to develop a distributed and erasable bookmarking tool for multi-person collaboration.

## What it does

The ICX is regard as a tool or station, where users can manage bookmarks via Internet Computer.


```
# The node-data hierarchy is designed as three levels.
App Node / Collection Node / Bookmark Node
```

There are two types of data:

### Square Data `100% Open to All`

Data is stored in the ICX-Canister. Edit access to data is open to all inludes modify & delete.

Data will be cleared regularly, to avoid that, users need a successfull vote for each node data.

### User Data `Only for User`
Data is encrypted and stored permanently in the user's Canister.Only userself has access to modify them.

The cost of creating the Canister is borne by the user.

## Features

- Page Home: Open Square. 100% Open to manage bookmarks
- Page Rank: Show User Point. Update after user modify.
- Page Activity: Show loggers.
- Page Feedback: Send report.
- Page About: Intro of app.
- Page Tool: Principal to account.
- IC-Naming
- Identity: Internet Identity & Plug.
- Dark/Light mode switch.(bottom left)
- Readonly/Write mode switch.(bottom left)

## What's next for ICX

- Vote
- Personal User Canister Management.
- Fork datas from suqare to user's own canister.
- Profile Picture

## How we built it

Start with a figma draft of this product, develop backend in motoko and then develop frontend in vue.

## Challenges we ran into

The identity is hard to get started, luckily I reference to many open source projects and examples.

## Accomplishments that we're proud of

### Product

- Feedback is integrated in the service

### Not Bad UI : )

- Dark/Light mode
- The Msg-Bot at right bottom for UI Embellishments
- The Human Check Verify Popup

## What we learned

- How to deploy & upgrade dapps on IC.
- Separate front and back-end development on IC.