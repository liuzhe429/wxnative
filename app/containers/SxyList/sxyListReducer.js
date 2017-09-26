//action
export const GET_SXYLIST_DATAS = 'GET_SXYLIST_DATAS'
export const CLEAR_SXYLIST_DATAS = 'CLEAR_SXYLIST_DATAS'
export function getSxyListDatas(sxyListdatas) {
  return {
    type: GET_SXYLIST_DATAS,
    sxyListdatas
  }
}
export function clearSxyListDatas(){
  return {
    type: CLEAR_SXYLIST_DATAS
  }
}
let initDatas = {
  sxyListdatas:[]
}
export default(state, action) => {
  if (!state) {
    return initDatas
  }
  switch (action.type) {
    case GET_SXYLIST_DATAS:
      return {
        ...state,
        sxyListdatas: state.sxyListdatas.concat(action.sxyListdatas)
      }
    case CLEAR_SXYLIST_DATAS:
      return {
        ...state,
        sxyListdatas:[]
      }
    default:
      return state
  }
}