import * as types from "../actions/action-types";
import initialState from "../store/initial-state";

export default function invoiceReducer(state = initialState.invoice, action) {
  switch (action.type) {
    case types.INVOICE_UPDATE:
      return action.invoice;

    default:
      return state;
  }
}
