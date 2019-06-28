import axios from "axios";
import * as types from "./action-types";
import * as toastActions from "./toast-actions";
import * as loaderActions from "./loader-actions";
import { CONFIG } from "../config-constants";
import Company from "../models/company";

function getCompanyUpdateEvent(company) {
  return {
    type: types.COMPANY_UPDATE,
    company: new Company(company)
  };
}

function showToast(message, type, dispatch) {
  toastActions.show({
    message,
    type
  })(dispatch);
}

export function update(company) {
  return function(dispatch) {
    dispatch(getCompanyUpdateEvent(company));
  };
}

export function load() {
  return async function(dispatch) {
    loaderActions.show()(dispatch);
    try {
      const { data } = await axios.get(`${CONFIG.URL.API}/data/company`);

      dispatch(getCompanyUpdateEvent(data));
    } catch (error) {
      console.warn("Company loading error:", error);
    }
    loaderActions.hide()(dispatch);
  };
}

export function save(company) {
  return async function(dispatch) {
    loaderActions.show()(dispatch);
    try {
      await axios.post(`${CONFIG.URL.API}/data/company`, company);
      showToast(CONFIG.MESSAGE.INFO.DETAILS_UPDATED, "success", dispatch);
    } catch (error) {
      showToast(CONFIG.MESSAGE.ERROR.FORM_INVALID, "danger", dispatch);
    }
    loaderActions.hide()(dispatch);
  };
}
