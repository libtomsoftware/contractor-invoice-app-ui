import axios from "axios";
import * as types from "./action-types";
import * as toastActions from "./toast-actions";
import { CONFIG } from "../config-constants";
import Client from "../models/client";

function getClientUpdateEvent(client) {
  return {
    type: types.CLIENT_UPDATE,
    client: new Client(client)
  };
}

function showToast(message, type, dispatch) {
  toastActions.show({
    message,
    type
  })(dispatch);
}

export function update(client) {
  return function(dispatch) {
    dispatch(getClientUpdateEvent(client));
  };
}

export function load() {
  return async function(dispatch) {
    try {
      const { data } = await axios.get(`${CONFIG.URL.API}/data/client`);

      dispatch(getClientUpdateEvent(data));
    } catch (error) {
      console.warn("Client loading error:", error);
    }
  };
}

export function save(client) {
  return async function(dispatch) {
    try {
      await axios.post(`${CONFIG.URL.API}/data/client`, client);
      showToast(CONFIG.MESSAGE.INFO.DETAILS_UPDATED, "success", dispatch);
    } catch (error) {
      showToast(CONFIG.MESSAGE.ERROR.FORM_INVALID, "danger", dispatch);
    }
  };
}
