import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function servicesReducer(state = initialState.services, action) {

    switch (action.type) {
    case types.SERVICES_UPDATE:
        return action.services;

    default:
        return state;
    }

}
