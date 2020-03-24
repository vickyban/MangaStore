import * as types from '@actions/types';

const INITIAL_STATE = {
  visible: false,
  render: null
}

export default reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return { visible: true, render: action.render };
    case types.CLOSE_MODAL:
      return INITIAL_STATE;
    default:
      return state
  }
}