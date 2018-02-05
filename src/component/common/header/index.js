import React, { Component } from 'react';
import { Input, Icon, Avatar } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import types from '../../../reducer/action-types';

const Search = Input.Search;

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: false,
            isRegister: false,
            isHome: false
        };
    }
    onSearchHandler = (v) => {
        v = (v || '').trim();
        console.log(v);
    }
    toLogin = () => {
        this.setState({
            isLogin: true
        });
    }
    toRegister = () => {
        this.setState({
            isRegister: true
        });
    }
    logOut = () => {
        this.props.dispatch({
            type: types.USER_LOGOUT
        });
    }
    renderHeaderRight = () => {

        let {
            isLogin,
            isRegister
        } = this.state;

        let {
            pushTo,
            title,
            user
        } = this.props;

        if (user) {
            return (
                <div className="app-header-content">
                    <div className="app-header-title fn-left">
                        <span className="app-header-title-item app-header-title-name">
                            {user['username']}</span>

                        <span className="app-header-title-item">
                            <Icon type="user" />
                            个人中心</span>
                        <span className="app-header-title-item" onClick={this.logOut}>
                            <Icon type="logout" className="app-header-title-item-icon" />
                            退出</span>
                    </div>
                    <div className="app-header-content-icon fn-right">
                        <div className="app-header-content-icon-span">
                            {
                                user['avatar'] ? (
                                    <Avatar src={user['avatar']} />
                                ) : <Avatar icon="user" />
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="app-header-content">
                    <span className="app-header-content-item" onClick={this.toLogin}>
                        登录
                    </span>
                    <span className="app-header-content-item" onClick={this.toRegister}>
                        注册
                    </span>
                    {isLogin ? <Redirect push to="/login" /> : null}
                    {isRegister ? <Redirect push to="/register" /> : null}
                </div>
            );
        }
    }
    toHome = () => {
        window.location.reload();
    }
    render() {
        let {
            isHome
        } = this.state;
        return (
            <div className="app-header fn-clear">
                <div className="fn-left app-header-left">
                    <div className="app-icon" onClick={this.toHome}>书架</div>
                    <div className="app-home" onClick={this.toHome}>首页</div>
                    <div className="app-search">
                        <Search
                            placeholder="搜索"
                            onSearch={this.onSearchHandler}
                            enterButton
                        />
                    </div>
                </div>
                <div className="fn-right app-header-right">
                    {this.renderHeaderRight()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ) {
    let userInfo = state['userInfo'].toJS();

    return {
        ...userInfo,
    };
}

function mapDispatchToProps(dispatch) {
    let method = {

    };
    let boundActionCreators = bindActionCreators(method, dispatch);
    return {
        dispatch,
        ...boundActionCreators
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);