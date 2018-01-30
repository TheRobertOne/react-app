/**
 * 用户登陆
 * 
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            redirect: null
        };
    }


    render() {
        let {
            redirect
        } = this.state;
        return (
            <div >
                <div onClick={() => {
                    this.setState({
                        redirect: 'Register'
                    });
                }}>登陆页 </div>
                {redirect ? <Redirect push to="/Register" /> : null}
            </div>
        );
    }
}

export default Login;

