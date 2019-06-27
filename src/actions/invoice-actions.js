import * as types from "./action-types";

function getInvoiceUpdateEvent(invoice) {
  return {
    type: types.INVOICE_UPDATE,
    invoice
  };
}

export function update(invoice) {
  return function(dispatch) {
    dispatch(getInvoiceUpdateEvent(invoice));
  };
}
