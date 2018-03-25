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

            return $$state.merge({
                'initData': action.payload
            });
        case types.HEADER_CHANGE_TITLE:
            return $$state.updateIn(['initData', 'lesson_title'], () => {
                return action.payload;
            });

        case types.HEADER_CHAGNE_LESSON_DETAIL:
            return $$state.updateIn(['initData', 'lesson_points'], () => {
                return action.payload;
            });
        case types.HEADER_CHAGNE_COURSEWARE:
            return $$state.updateIn(['initData', 'courseware'], () => {
                return action.payload;
            });


        default:
            return $$state;
    }
}