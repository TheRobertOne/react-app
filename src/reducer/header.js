import immutable from 'immutable';
import types from './action-types';
// import network from '../util/network';
// import message from '../util/message';

let initState = {
    initData: {
        "lesson_title": "",
        "lesson_points": "",
        "courseware": []
    }
};

let $$initState = immutable.fromJS(initState);

export default ($$state = $$initState, action = {}) => {
    switch (action.type) {
        case types.HEADER_INIT_DATA:
            return $$state.updateIn(['initData'], (oldValue) => {
                return action.payload;
            });
        default:
            return $$state;
    }
}