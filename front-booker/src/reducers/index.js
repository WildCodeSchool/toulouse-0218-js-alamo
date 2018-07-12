import { combineReducers } from 'redux'
import user from './user'
import infoWindow from './infoWindow'

export default combineReducers({
  user: user,
  infoWindow: infoWindow
})