/**
 * 用户登陆
 * 
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import message from '../../util/message';
import validator from '../../util/validator';
import {
    doLogin
} from '../../reducer/user-info';
class Setting extends Component {
    constructor() {
        super();
        this.state = {
            isRegister: false,//是否跳转到注册页面
            mobile: '',//
            password: ''
        };
    }
    //跳转到注册页面
    goToRegister = () => {
        this.setState({
            isRegister: true//跳转到注册页面
        });
    }
    onChangeMobile = (e) => {
        this.setState({
            mobile: e.target.value
        });
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    onLogin = () => {
        let {
            mobile,
            password
        } = this.state;
        mobile = (mobile || '').trim();
        password = (password || '').trim();
        if (validator.isEmptyString(mobile)) {
            message.warning('请输入手机号');
            return;
        }
        if (validator.isEmptyString(password)) {
            message.warning('请输入密码');
            return;
        }

        this.props.doLogin({
            mobile,
            password
        });
    }
    render() {
        let {
            isRegister
        } = this.state;
       

        return (
            <div className="login-box">
                {isRegister ? <Redirect push to="/register" /> : null}
                <div onClick={this.goToRegister}>
                    发撒浪嘿烦了</div>
            </div>
        );
    }
}

function mapStateToProps(state, ) {
    let userInfo = state['userInfo'].toJS();
    let {
        user,
        token
    } = userInfo;

    return {
        user,
        token
    };
}

function mapDispatchToProps(dispatch) {
    let method = {
        doLogin
    };
    let boundActionCreators = bindActionCreators(method, dispatch);
    return {
        dispatch,
        ...boundActionCreators
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
