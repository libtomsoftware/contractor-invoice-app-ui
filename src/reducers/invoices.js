import * as types from "../actions/action-types";
import initialState from "../store/initial-state";

export default function invoicesReducer(state = initialState.invoices, action) {
  switch (action.type) {
    case types.INVOICES_UPDATE:
      return action.invoices;
    default:
      return state;
  }
}
