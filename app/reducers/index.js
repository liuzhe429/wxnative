import { combineReducers } from 'redux'
import homeReducer from '../containers/Home/homeReducer'
import dealListReducer from '../containers/DealList/dealListReducer'
//合并reducer
export default combineReducers({
  homeReducer,
  dealListReducer
})
