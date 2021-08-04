import { Action } from '../actions/gameActions';

export interface GameModeState {
  mode: string;
}

const initialState = {
  mode: 'train',
};

export const gameModeReducer = (state: GameModeState = initialState, action: Action) => {
  switch (action.type) {
    case 'CHANGE_GAME_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};
