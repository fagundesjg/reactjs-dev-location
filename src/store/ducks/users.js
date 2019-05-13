/*
    TYPES
*/
export const Types = {
  ADD_REQUEST: "users/ADD_REQUEST",
  ADD_SUCCESS: "users/ADD_SUCCESS",
  ADD_FAIL: "users/ADD_FAIL",
  REMOVE: "users/REMOVE",
};

/*
    REDUCERS
*/
const INITIAL_STATE = {
  loading: false,
  error: null,
  data: [],
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.user],
      };
    case Types.ADD_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case Types.REMOVE:
      return {
        ...state,
        loading: false,
        error: null,
        data: state.data.filter(user => user.id !== action.payload.id),
      };
    default:
      return state;
  }
}

/*
    ACTIONS
*/
export const Creators = {
  addUserRequest: (login, coords) => ({
    type: Types.ADD_REQUEST,
    payload: { login, coords },
  }),

  addUserSuccess: user => ({
    type: Types.ADD_SUCCESS,
    payload: { user },
  }),

  addUserFail: error => ({
    type: Types.ADD_FAIL,
    payload: { error },
  }),

  userRemove: id => ({
    type: Types.REMOVE,
    payload: { id },
  }),
};
