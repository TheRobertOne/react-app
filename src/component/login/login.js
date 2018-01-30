/**
 * 用户登陆
 * 
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Input } from 'antd';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            isRegister: false//是否跳转到注册页面
        };
    }
    //跳转到注册页面
    goToRegister = () => {
        this.setState({
            isRegister: true//跳转到注册页面
        });
    }
    render() {
        let {
            isRegister
        } = this.state;
        return (
            <div className="login-box">
                <div className="login-header fn-clear">
                    <div className="fn-left"></div>
                    <div className="fn-right login-header-register">
                        <span onClick={this.goToRegister}>注册</span>
                    </div>
                    {isRegister ? <Redirect push to="/Register" /> : null}
                </div>
                <div className="login-content">
                    <div className="login-content-item">
                        <span>手机号码:</span><Input placeholder="请输入您的用户名" />
                    </div>
                    <div className="login-content-item">
                        <span>密码 :</span><Input placeholder="请输入您的用户名" />
                    </div>
                    <div className="login-content-submit">
                        <span>登陆</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

