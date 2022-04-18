import { reactive, toRefs, watch, computed, Ref, nextTick } from 'vue'
import { useAppStore } from '@/store/modules/app'

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
  const appStore = useAppStore()
  defaultState.pageSize = pageSize || 10
  const state = reactive({ ...defaultState })
  const _isEnd = computed(() => state.total <= state.list?.length)
  const _isEmpty = computed(() => state.list?.length <= 0)
  const _loading = computed(()=>appStore.getIsLoading||state.loading)

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

      res = await appStore.handleCall({
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
    queryList,
    initPagination,
    nextPage,
    ...toRefs(state),
  }
}

export default usePagination
