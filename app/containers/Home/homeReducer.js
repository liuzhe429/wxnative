//action
export const GET_ZX_DATAS = 'GET_ZX_DATAS'
export const GET_SXY_DATAS = 'GET_SXY_DATAS'
export const CLEAR_ZX_DATAS = 'CLEAR_ZX_DATAS'
export const CLEAR_SXY_DATAS = 'CLEAR_SXY_DATAS'
export function getZxDatas(zxdatas) {
  return {
    type: GET_ZX_DATAS,
    zxdatas
  }
}
//新手专区判断
export function getSxyDatas(sxydatas){
 return {
   type: GET_SXY_DATAS,
   sxydatas
 }
}
export function clearZxDatas(){
  return {
    type: CLEAR_ZX_DATAS
  }
}
export function clearSxyDatas(){
  return {
    type: CLEAR_SXY_DATAS
  }
}
let initDatas = {
  zxdatas:[],
  sxydatas:[]
}
export default(state, action) => {
  if (!state) {
    return initDatas
  }
  switch (action.type) {
    case GET_ZX_DATAS:
      return {
        ...state,
        zxdatas: state.zxdatas.concat(action.zxdatas)
      }
    case GET_SXY_DATAS:
      return {
        ...state,
        sxydatas: state.sxydatas.concat(action.sxydatas)
      }
    case CLEAR_ZX_DATAS:
      return {
        ...state,
        zxdatas:[]
      }
    case CLEAR_SXY_DATAS:
      return {
        ...state,
        sxydatas:[]
      }
    default:
      return state
  }
}