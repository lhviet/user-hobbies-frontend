import { combineReducers, AnyAction } from 'redux';

import { StoreState } from '../../types';

import appReducer from './app';
import userReducer from './user';
import hobbyReducer from './hobby';

export default combineReducers<StoreState, AnyAction>({
  app: appReducer,
  user: userReducer,
  hobby: hobbyReducer,
});
