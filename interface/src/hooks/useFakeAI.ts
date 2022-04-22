import { reactive, toRefs } from 'vue'
import { MessageType } from '@/model/msg'
import { useAuthStore } from '@/store/modules/auth'

const HOUR = 1_000 * 60 * 60
const DURATION = 1_000 * 60 * 8

const defaultState = {
  count: 0,
  lastTime:0,
  _repeat: false,
  _isHour: false
}

function Random(min:number, max:number) {
  return Math.round(Math.random() * (max - min)) + min;
}

const useFakeAI = () => {
  const startTime = Date.now()
  const authStore = useAuthStore()
  const state = reactive({ ...defaultState })

  let allMsgs = FAKE_MSGS_UINT.map((e:any)=>(e[1].map((f:string)=>e[0]+' '+f))).flat()

  const handleGlobalClick = ()=>{
    state.count ++
    const now = Date.now()
    autoMsg(now)
    checkHour(now)
  }

  const autoMsg = (now:number)=>{
    if(now-state.lastTime <= DURATION) return

    if(state.count > 20 && state.count%3===0) {
      // console.log('index',state.count)
    
      const _i = Random(0,allMsgs.length-1)

      if(allMsgs[_i]){
        authStore.addMsg(allMsgs[_i],MessageType.INFO)
        state.lastTime = now
        !state._repeat && delete allMsgs[_i]
      }
    }
  }

  const checkHour = (now:number)=>{
    if(state._isHour) return
    if(now - startTime <= HOUR) return
    authStore.addMsg("You have stayed here over 1 hour",MessageType.INFO)
    state._isHour = true
  }



  return {
    handleGlobalClick,
    ...toRefs(state),
  }
}

export default useFakeAI

const FAKE_MSGS_UINT = [
  [
    "I'm",
    [
      "hungry.",
      "still here.",
      "looking forward to seeing you next time.",
    ]
  ],
  [
    "Do you like",
    [
      "apple or pineapple?",
      "beach or forest?",
      "web2 or web3?",
    ]
  ],
  [
    "What's",
    [
      "Up?",
      "the weather today?",
      "the weekend plan?",
    ]
  ],
  [
    "Have you",
    [
      "been to Antarctica?",
      "went for a jogging?",
      "dreamed about something awesome?"
    ]
  ]
]