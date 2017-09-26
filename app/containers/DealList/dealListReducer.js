//action
export const GET_ZXLIST_DATAS = 'GET_ZXLIST_DATAS'
export const CLEAR_ZXLIST_DATAS = 'CLEAR_ZXLIST_DATAS'
export function getZxListDatas(zxlistdatas,zxlistpage=1) {
  return {
    type: GET_ZXLIST_DATAS,
    zxlistdatas,
    zxlistpage
  }
}
export function clearZxListDatas(){
  return {
    type : CLEAR_ZXLIST_DATAS
  }
}
let initDatas = {
  zxlistdatas:[],
  zxlistpage:1
}
export default(state, action) => {
  if (!state) {
    return initDatas
  }
  switch (action.type) {
    case GET_ZXLIST_DATAS:
      return {
        ...state,
        zxlistdatas: state.zxlistdatas.concat(action.zxlistdatas),
        zxlistpage: action.zxlistpage
      }
    case CLEAR_ZXLIST_DATAS:
      return {
        ...state,
        zxlistdatas:[],
        zxlistpage:1
      }
    default:
      return state
  }
}