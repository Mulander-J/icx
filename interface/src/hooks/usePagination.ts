import { reactive, toRefs, computed } from 'vue'
import { MessageType } from '@/model/msg'
import { useAuthStore } from '@/store/modules/auth'

const defaultState = {
  loading: false,
  _isError: false,
  list: [] as any [],
  pageSize: 10,
  pageNum: 1,
  total: 0
}

const usePagination = <T>(
  callOpt:{name:string,cmd:any},
  getPayloads?:any,
  pageSize?:number,
) => {
  const authStore = useAuthStore()
  defaultState.pageSize = pageSize || 10
  const state = reactive({ ...defaultState })
  const _isEnd = computed(() => state.total <= state.list?.length)
  const _isEmpty = computed(() => state.list?.length <= 0)
  const _loading = computed(()=>authStore.getIsLoading||state.loading)

  const queryList = async (isInit = false) => {
    let res: any
    state.loading = true    
    if (isInit) {
      state.list.length = 0
      state.pageNum = 1
      state.total = 0
    }

    try {
      const generatePayloads = getPayloads
        ? getPayloads({ pageSize:state.pageSize, pageNum:state.pageNum}) 
        : [state.pageSize,state.pageNum]

      if(generatePayloads==null){
        return
      }

      res = await authStore.handleCall({
        ...callOpt
      },...generatePayloads)
      state.list = (
        [...(state.list || []), ...res[1]]
      ) as T[]
      state.total = Number(res[0])
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

  const nextPage = async ()=>{
    const _nextP = state.pageNum + 1
    if(!_isEnd.value){
      state.pageNum = _nextP
      await queryList()
    }
  }

  return {
    _isEnd,
    _isEmpty,
    _loading,
    setError,
    queryList,
    initPagination,
    nextPage,
    ...toRefs(state),
  }
}

export default usePagination
