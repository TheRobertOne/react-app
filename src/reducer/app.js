import immutable from 'immutable';
import types from './action-types';
import network from '../util/network';
import message from '../util/message';
import getUserInfo from '../util/getUserInfo';

let initState = {
    componentPath: null
};

let $$initState = immutable.fromJS(initState);

export default ($$state = $$initState, action = {}) => {
    switch (action.type) {
        /**
         * 切换主页内容组件
         */
        case types.APP_COMPONENT_PATH:
            return $$state.merge({
                componentPath: action.payload
            });
        default:
            return $$state;
    }
}