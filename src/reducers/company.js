import * as types from "../actions/action-types";
import initialState from "../store/initial-state";

export default function companyReducer(state = initialState.company, action) {
  switch (action.type) {
    case types.COMPANY_UPDATE:
      return action.company;

    default:
      return state;
  }
}
