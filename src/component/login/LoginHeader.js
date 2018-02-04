import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LoginHeader extends Component {
    constructor() {
        super();
        this.state = {
            isHome: false,
            isToPath: false
        };
    }
    goToHome = () => {
        this.setState({
            isHome: true
        });
    }
    goToRegister = () => {

        this.setState({
            isToPath: true
        });
    }
    render() {
        let {
            isToPath,
            isHome
        } = this.state;

        let {
            pushTo,
            title
        } = this.props;

        return (
            <div className="login-register-header fn-clear">
                <div className="fn-left">
                    <span onClick={this.goToHome}
                        className="login-register-header-home">首页</span>
                </div>
                <div className="fn-right">
                    <span onClick={this.goToRegister}
                        className="login-register-header-redirect"
                    >{title}</span>
                </div>
                {isHome ? <Redirect push to="/" /> : null}
                {isToPath ? <Redirect push to={pushTo} /> : null}
            </div>
        );
    }
}

export default LoginHeader;
