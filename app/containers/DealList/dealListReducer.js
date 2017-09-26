//action
export const GET_ZX_DATAS = 'GET_ZX_DATAS'
export function getZxListDatas(zxdatas) {
  return {
    type: GET_ZX_DATAS,
    zxdatas
  }
}

let initDatas = {
  zxdatas:[]
}
export default(state, action) => {
  if (!state) {
    return initDatas
  }
  switch (action.type) {
    case GET_ZX_DATAS:
      return {
        ...state,
        sxydatas: state.zxdatas.concat(action.zxdatas)
      }
    default:
      return state
  }
}