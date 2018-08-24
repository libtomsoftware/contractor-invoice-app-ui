import { combineReducers } from 'redux';
import client from './client';
import company from './company';
import config from './config';
import loader from './loader';
import invoice from './invoice';
import services from './services';
import settings from './settings';
import toast from './toast';

const rootReducer = combineReducers({
    client,
    config,
    company,
    invoice,
    loader,
    services,
    settings,
    toast
});

export default rootReducer;
