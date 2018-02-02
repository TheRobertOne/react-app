import immutable from 'immutable';
import types from './action-types';
import network from '../util/network';
import message from '../util/message';

let initState = {
    user: null,
    token: null
};

let $$initState = immutable.fromJS(initState);

export default ($$state = $$initState, action = {}) => {
    switch (action.type) {
        /**
         * 用户登录获取用户信息和token
         */
        case types.USER_LOGIN:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return $$state.merge({
                'user': action.payload.user,
                'token': action.payload.token
            });
        /**
         * 注册
         */
        case types.USER_REGISTER:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return $$state.merge({
                'user': action.payload.user,
                'token': action.payload.token
            });
        /**
         * 登出
         */
        case types.USER_LOGOUT:
            localStorage.setItem('token', null);
            localStorage.setItem('user', null);
            return $$state.merge({
                'user': null,
                'token': null
            });
        default:
            return $$state;
    }
};

/**
 * 
 * @param {Object} user 
 */
export function doLogin(user) {
    return (dispatch, getState) => {
        network().post('/login', user, (json) => {
            message.success('登录成功');
            dispatch({
                type: types.USER_LOGIN,
                payload: json
            });
            window.location.href = '#/';
        }, (err) => {
            message.error(err.message);
        });
    };
}

/**
 * 
 * @param {Object} user 
 */
export function doRegister(user) {
    return (dispatch, getState) => {
        network().post('/register', user, (json) => {
            message.success('注册成功');
            dispatch({
                type: types.USER_REGISTER,
                payload: json
            });
            window.location.href = '#/';
        }, (err) => {
            message.error(err.message);
        });
    };
}




