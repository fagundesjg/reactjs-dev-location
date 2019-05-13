/*
    TYPES
*/

export const Types = {
  SHOW: "modal/SHOW",
  HIDE: "modal/HIDE",
};

/*
      REDUCERS
  */

const INITIAL_STATE = {
  isVisible: false,
  coords: { latitude: 0, longitude: 0 },
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW:
      return {
        isVisible: true,
        coords: action.payload.coords,
      };
    case Types.HIDE:
      return {
        isVisible: false,
        coords: { latitude: 0, longitude: 0 },
      };
    default:
      return state;
  }
}

/*
  ACTIONS
*/
export const Creators = {
  showModal: coords => ({
    type: Types.SHOW,
    payload: { coords },
  }),

  hideModal: () => ({
    type: Types.HIDE,
  }),
};
