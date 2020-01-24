import axios from "axios";
import * as types from "./action-types";
import * as loaderActions from "./loader-actions";
import { CONFIG } from "../config-constants";
import * as toastActions from "./toast-actions";

function getServicesUpdateEvent(services) {
  return {
    type: types.SERVICES_UPDATE,
    services
  };
}

function showToast(message, type, dispatch) {
  toastActions.show({
    message,
    type
  })(dispatch);
}

export function update(services) {
  return function(dispatch) {
    dispatch(getServicesUpdateEvent(services));
  };
}

export function load() {
  return async function(dispatch) {
    loaderActions.show()(dispatch);
    try {
      const { data } = await axios.get(`${CONFIG.URL.API}/data/services`);

      dispatch(getServicesUpdateEvent(data.services));
    } catch (error) {
      console.warn("Services loading error:", error);
    }
    loaderActions.hide()(dispatch);
  };
}

export function save(services) {
  return async function(dispatch) {
    loaderActions.show()(dispatch);
    try {
      const { data } = await axios.post(
        `${CONFIG.URL.API}/data/services`,
        services
      );
      showToast(CONFIG.MESSAGE.INFO.SERVICES_UPDATED, "success", dispatch);

      dispatch(getServicesUpdateEvent(data.services));
    } catch (error) {
      showToast(CONFIG.MESSAGE.ERROR.FORM_INVALID, "danger", dispatch);
    }
    loaderActions.hide()(dispatch);
  };
}
