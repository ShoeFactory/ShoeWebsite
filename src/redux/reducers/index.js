import { combineReducers } from 'redux';

import userReducer from './user'
import uiReducer from './ui'
import positionReducer from './position'

const rootReducer = combineReducers({
  uiReducer,
  userReducer,
  positionReducer,
});

export default rootReducer;