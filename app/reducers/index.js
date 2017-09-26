import { combineReducers } from 'redux'
import homeReducer from '../containers/Home/homeReducer'
import dealListReducer from '../containers/DealList/dealListReducer'
import sxyListReducer from '../containers/SxyList/sxyListReducer'
//合并reducer
export default combineReducers({
  homeReducer,
  dealListReducer,
  sxyListReducer
})
