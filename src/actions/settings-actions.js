import axios from 'axios';
import * as types from './action-types';
import { CONFIG } from '../config-constants';
import Settings from '../models/settings';
import * as toastActions from './toast-actions';

function getSettingsUpdateEvent(settings) {
    return {
        type: types.SETTINGS_UPDATE,
        settings: new Settings(settings)
    };
}

function showToast(message, type, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

export function update(settings) {
    return function (dispatch) {
        dispatch(getSettingsUpdateEvent(settings));
    };
}

export function load() {
    return async function (dispatch) {
        try {
            const {data} = await axios.get(`${CONFIG.URL.API}/data/settings`);

            dispatch(getSettingsUpdateEvent(data));
        } catch (error) {
            console.warn('Settings loading error:', error);
        }
    };
}

export function save(settings) {
    return async function (dispatch) {
        try {
            await axios.post(`${CONFIG.URL.API}/data/settings`, settings);
            showToast(CONFIG.MESSAGE.INFO.SETTINGS_UPDATED, 'success', dispatch);
        } catch (error) {
            showToast(CONFIG.MESSAGE.ERROR.FORM_INVALID, 'danger', dispatch);
        }
    };
}
