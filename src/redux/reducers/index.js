import { combineReducers } from 'redux';

import userReducer from './user'
import uiReducer from './ui'

const rootReducer = combineReducers({
  userReducer,
  uiReducer
});

export default rootReducer;