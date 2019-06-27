import * as types from "./action-types";

function getServicesUpdateEvent(services) {
  return {
    type: types.SERVICES_UPDATE,
    services
  };
}

export function update(services) {
  return function(dispatch) {
    dispatch(getServicesUpdateEvent(services));
  };
}
