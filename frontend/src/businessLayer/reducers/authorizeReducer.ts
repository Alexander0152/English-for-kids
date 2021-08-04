import { Action } from '../actions/authorizeAction';

export interface IsAuthorizeState {
  isAuthorized: boolean;
}

const initialState = {
  isAuthorized: false,
};

export const authorizeReducer = (state: IsAuthorizeState = initialState, action: Action) => {
  switch (action.type) {
    case 'AUTHORIZE':
      return { ...state, isAuthorized: action.payload };
    default:
      return state;
  }
};
