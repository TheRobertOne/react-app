import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import RootRouter from './router/root-router';
import RootReducer from './reducer/root-reducer';
require('./component/index.scss');
let middleware = [
    thunk
];
let initState = {};
let isDev = process.env.NODE_ENV === 'development' ? true : false;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, initState, isDev ? composeEnhancers(
    applyMiddleware(...middleware)
) : applyMiddleware(...middleware));



function render() {
    ReactDom.render(
        <Provider store={store}>
            <RootRouter />
        </Provider>,
        document.getElementById('root')
    );
}
render();

store.subscribe(render);
if (module.hot) {
    module.hot.accept(['./router/root-router'], function (data) {
        console.log('Accepting the updated  module!');
        console.log(data);
        render();
    });

}

