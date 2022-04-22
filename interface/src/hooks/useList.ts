import { reactive, toRefs, computed } from 'vue'
import { MessageType } from '@/model/msg'
import { useAuthStore } from '@/store/modules/auth'

const defaultState = {
  loading: false,
  _isError: false,
  list: [] as any []
}

const useList= <T>(
  callOpt:{name:string,cmd:any},
  getPayloads?:any,
) => {
  const authStore = useAuthStore()
  const state = reactive({ ...defaultState })
  const _total = computed(()=>state.list?.length||0)
  const _isEmpty = computed(() => state.list?.length <= 0)
  const _loading = computed(()=>authStore.getIsLoading||state.loading)

  const queryList = async (isInit = false) => {
    let res: any
    state.loading = true    
    if (isInit) {
      state.list.length = 0
    }

    try {
      const generatePayloads = getPayloads
        ? getPayloads() 
        : []

      if(generatePayloads==null){
        return
      }

      res = await authStore.handleCall({
        ...callOpt
      },...generatePayloads)
      state.list = ([ ...res]) as T[]
      state._isError = false
    } catch (err) {
      state._isError = true
    } finally{
      state.loading = false
    }
  }

  const setError = (msg:string)=>{
    authStore.addMsg(msg,MessageType.ERROR)
  }

  const initPagination = async () => {
    Object.assign(state, defaultState)
    await queryList(true)
  }



  return {
    _isEmpty,
    _loading,
    _total,
    setError,
    queryList,
    initPagination,
    ...toRefs(state),
  }
}

export default useList
