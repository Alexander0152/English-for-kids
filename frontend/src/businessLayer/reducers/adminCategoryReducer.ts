import { Action } from '../actions/changeAdminCategoryAction';

export interface AdminCategoryState {
  category: string;
}

const initialState = {
  category: '',
};

export const adminCategoryReducer = (state: AdminCategoryState = initialState, action: Action) => {
  switch (action.type) {
    case 'CHANGE_ADMIN_CATEGORY':
      return { ...state, category: action.payload };
    default:
      return state;
  }
};
