import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import RootRouter from './router/root-router';
import RootReducer from './reducer/root-reducer';
require("./component/style-entry");
let middleware = [
    thunk
];
let initState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, initState, composeEnhancers(
    applyMiddleware(...middleware)
));



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

