export type Action = { type: 'CHANGE_ADMIN_CATEGORY'; payload: string };

export const changeAdminCategory = (category: string): Action => ({
  type: 'CHANGE_ADMIN_CATEGORY',
  payload: category,
});
