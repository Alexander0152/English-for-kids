export type Action = { type: 'AUTHORIZE'; payload: boolean };

export const changeIsAuthorize = (isAuthorized: boolean): Action => ({
  type: 'AUTHORIZE',
  payload: isAuthorized,
});
