import { combineReducers } from 'redux';
import { changeAdminCategory } from '../actions/changeAdminCategoryAction';
import { adminCategoryReducer, AdminCategoryState } from './adminCategoryReducer';
import { authorizeReducer, IsAuthorizeState } from './authorizeReducer';
import { gameModeReducer, GameModeState } from './gameModeReducer';

export interface RootReducerState {
  gameMode: GameModeState;
  authorize: IsAuthorizeState;
  adminCategory: AdminCategoryState;
}

export const rootReducer = combineReducers({
  gameMode: gameModeReducer,
  authorize: authorizeReducer,
  adminCategory: adminCategoryReducer,
});
