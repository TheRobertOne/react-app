/**
 * 用户注册
 * 
 */

import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from '../../util/validator';
import message from '../../util/message';
import {
    doRegister
} from '../../reducer/user-info';
import LoginHeader from './LoginHeader';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            mobile: '',//手机号码
            password: '',//密码
            username: '',//名号
        }
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

        this.props.doRegister({
            mobile,
            password,
            username
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

        return (
            <div className="register-box">
                <LoginHeader pushTo="/login" title="登录" />
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
        doRegister
    };
    let boundActionCreators = bindActionCreators(method, dispatch);
    return {
        dispatch,
        ...boundActionCreators
    }

};
export default connect(mapStateToProps, mapDispatchToProps)(Register);

