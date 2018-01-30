/**
 * 用户注册
 * 
 */

import React, { Component } from 'react';
import { Input } from 'antd';
import { Redirect } from 'react-router-dom';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            isHome: false//是否跳转到首页
        }
    }
    //跳转到首页
    goToHome = () => {
        this.setState({
            isHome: true
        });
    }
    render() {
        let {
            isHome
        } = this.state;
        return (
            <div className="register-box">
                <div className="register-header">
                    <div className="fn-left">
                        <span onClick={this.goToHome} className="register-header-home">首页</span>
                    </div>
                    <div className="fn-right">
                        <span onClick={this.goToHome} className="register-header-home">直接登录</span>
                    </div>

                    {isHome ? <Redirect push to="/" /> : null}
                </div>
                <div className="register-content">
                    <div className="register-content-item">
                        <span className="item-title">手机号</span><Input placeholder="请输入手机号" className="item-inp" />
                    </div>
                    <div className="register-content-item">
                        <span className="item-title">密码</span><Input placeholder="请输入密码" className="item-inp" />
                    </div>
                    <div className="register-content-submit register-content-item">
                        <span className="item-title"></span><span className="register-submit">完成注册</span>
                    </div>

                </div>
            </div>
        );
    }
}

export default Register;

