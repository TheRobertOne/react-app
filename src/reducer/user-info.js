import immutable from 'immutable';
import types from './action-types';
import network from '../util/network';
import message from '../util/message';
import getUserInfo from '../util/getUserInfo';

let initState = {
    user: null,
    token: null,
    userList: null
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

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload(false);
            return $$state.merge({
                'user': null,
                'token': null
            });
        case types.USER_ALL_USERS:
            return $$state.merge({
                'userList': action.payload
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
            console.log(json)
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

/**
 * 获取所有用户列表
 */
export function doGeAllUsers() {

    return (dispatch, getState) => {
        let { token } = getUserInfo(getState());

        network(token).get('/users', (json) => {
            message.success('获取所有用了');
            console.log(json);
            dispatch({
                type: types.USER_ALL_USERS,
                payload: json
            });

        }, (err) => {
            message.error(err.message);
        });
    };
}





