import * as types from "./action-types";
import axios from "axios";
import * as toastActions from "./toast-actions";
import * as loaderActions from "./loader-actions";

import { CONFIG } from "../config-constants";

function getInvoiceUpdateEvent(invoice) {
  return {
    type: types.INVOICE_UPDATE,
    invoice
  };
}

function getInvoicesListUpdateEvent(invoices) {
  return {
    type: types.INVOICES_UPDATE,
    invoices
  };
}

function showToast(message, type, dispatch) {
  toastActions.show({
    message,
    type
  })(dispatch);
}

export function update(invoice) {
  return function(dispatch) {
    dispatch(getInvoiceUpdateEvent(invoice));
  };
}

export function save(invoice) {
  return async function(dispatch) {
    try {
      await axios.put(`${CONFIG.URL.API}/data/invoice`, invoice);
      showToast(CONFIG.MESSAGE.INFO.INVOICE_SAVED, "success", dispatch);
    } catch (error) {
      showToast(CONFIG.MESSAGE.ERROR.SOMETHING_WRONG, "danger", dispatch);
    }
  };
}

export function remove(id) {
  return async function(dispatch) {
    try {
      const { data } = await axios.delete(
        `${CONFIG.URL.API}/data/invoice/${id}`
      );

      dispatch(getInvoicesListUpdateEvent(data));

      showToast(CONFIG.MESSAGE.INFO.INVOICE_DELETED, "success", dispatch);
    } catch (error) {
      showToast(CONFIG.MESSAGE.ERROR.SOMETHING_WRONG, "danger", dispatch);
    }
  };
}

export function fetchAll() {
  return async function(dispatch) {
    try {
      loaderActions.show()(dispatch);
      const result = await axios.get(`${CONFIG.URL.API}/data/invoices`);

      dispatch(getInvoicesListUpdateEvent(result.data));
    } catch (error) {
      showToast(CONFIG.MESSAGE.ERROR.SOMETHING_WRONG, "danger", dispatch);
    }
    loaderActions.hide()(dispatch);
  };
}
