import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import App from '../component/app';
import types from '../reducer/action-types';
import Register from '../component/login/register';
import Login from '../component/login/login';

class RootRouter extends Component {
    componentDidMount() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        if (token && user) {
            this.props.dispatch({
                type: types.USER_LOGIN,
                payload: { user: JSON.parse(user), token }
            });
        }
    }
    render() {
        return (
            <Router>
                <div className="router-box">
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </div>
            </Router>
        );
    }
}

export default connect()(RootRouter);
