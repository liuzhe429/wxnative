//action
export const GET_ZX_DATAS = 'GET_ZX_DATAS'
export const GET_SXY_DATAS = 'GET_SXY_DATAS'
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
    default:
      return state
  }
}