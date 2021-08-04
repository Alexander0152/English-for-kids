export type Action = { type: 'CHANGE_GAME_MODE'; payload: string };

export const changeGameMode = (mode: string): Action => ({
  type: 'CHANGE_GAME_MODE',
  payload: mode,
});
