import immutable from 'immutable';
import types from './action-types';
import network from '../util/network';
import message from '../util/message';

let initState = {
    componentPath: null
};

let $$initState = immutable.fromJS(initState);

export default ($$state = $$initState, action = {}) => {
    switch (action.type) {
       
        default:
            return $$state;
    }
}