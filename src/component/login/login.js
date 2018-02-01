/**
 * 用户登陆
 * 
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import network from '../../util/network';
import message from '../../util/message';
import validator from '../../util/validator';
import {
    doLogin
} from '../../reducer/user-info';
class Login extends Component {
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
        let {
            user,
            token
        } = this.props;

        return (
            <div className="login-box">
                {user ? <Redirect push to="/" /> : null}
                <div className="login-header fn-clear">
                    <div className="fn-left"></div>
                    <div className="fn-right login-header-register">
                        <span onClick={this.goToRegister}>注册</span>
                    </div>
                    {isRegister ? <Redirect push to="/register" /> : null}
                </div>
                <div className="login-content">
                    <div className="login-content-item">
                        <span className="item-title">手机号</span>
                        <Input
                            placeholder="请输入手机号"
                            className="item-inp"
                            onChange={this.onChangeMobile}
                        />
                    </div>
                    <div className="login-content-item">
                        <span className="item-title">密码</span>
                        <Input
                            placeholder="请输入密码"
                            className="item-inp"
                            type="password"
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="login-content-item login-content-submit">
                        <span className="item-title"></span>
                        <Button onClick={this.onLogin} className="login-submit" type="primary">登录</Button>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
