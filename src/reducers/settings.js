import * as types from "../actions/action-types";
import initialState from "../store/initial-state";

export default function settingsReducer(state = initialState.settings, action) {
  switch (action.type) {
    case types.SETTINGS_UPDATE:
      return action.settings;

    default:
      return state;
  }
}
