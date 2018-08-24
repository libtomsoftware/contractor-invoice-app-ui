import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function clientReducer(state = initialState.client, action) {

    switch (action.type) {
    case types.CLIENT_UPDATE:
        return action.client;

    default:
        return state;
    }

}
