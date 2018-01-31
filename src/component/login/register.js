/**
 * 用户注册
 * 
 */

import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import network from '../../util/network';
import validator from '../../util/validator';
import message from '../../util/message';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            isHome: false,//是否跳转到首页
            mobile: '',//手机号码
            password: '',//密码
            username: '',//名号
        }
    }
    //跳转到首页
    goToHome = () => {
        this.setState({
            isHome: true
        });
    }
    //提交注册
    submitRegister = () => {
        let {
            mobile,
            password,
            username
        } = this.state;
        mobile = (mobile || '').trim();
        password = (password || '').trim();
        username = (username || '').trim();
        if (validator.isEmptyString(mobile)) {
            message.warning('请输入手机号码!');
            return;
        }
        if (validator.isEmptyString(password)) {
            message.warning('请输入密码!');
            return;
        }
        if (validator.isEmptyString(username)) {
            message.warning('请输入名号!');
            return;
        }

        network.post('/register', {
            mobile,
            password,
            username
        }, (json) => {
            console.log(json);
        }, (err) => {

        });
    }
    //手机号码变化
    onChangeMobile = (e) => {
        this.setState({
            mobile: e.target.value
        });
    }
    //密码变化
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    //名号变化
    onChangeName = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    render() {
        let {
            isHome
        } = this.state;
        return (
            <div className="register-box a">
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
                        <span className="item-title">手机号</span>
                        <Input
                            onChange={this.onChangeMobile}
                            placeholder="请输入手机号"
                            className="item-inp" />
                    </div>
                    <div className="register-content-item">
                        <span className="item-title">密码</span>
                        <Input
                            onChange={this.onChangePassword}
                            placeholder="请输入密码"
                            className="item-inp"
                            type="password" />
                    </div>
                    <div className="register-content-item">
                        <span className="item-title">名号</span>
                        <Input
                            onChange={this.onChangeName}
                            placeholder="请输入名号"
                            className="item-inp" />
                    </div>
                    <div className="register-content-submit register-content-item">
                        <span className="item-title"></span>
                        <Button onClick={this.submitRegister} className="register-submit" type="primary">完成注册</Button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Register;

