import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import DataLoader from './services/data-loader';
import configureStore from './store/configure-store';
import routes from './routes';

const store = configureStore();

DataLoader.store = store;

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);