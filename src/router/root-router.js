import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import App from '../component/app';
import Register from '../component/login/register';
import Login from '../component/login/login';
class RootRouter extends Component {

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

export default RootRouter;
