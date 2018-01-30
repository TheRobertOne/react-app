import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import App from '../component/app';
import Register from '../component/login/register';
class RootRouter extends Component {

    render() {
        return (
            <Router>
                <div className="router-box">
                    <Route exact path="/" component={App} />
                    <Route exact path="/Register" component={Register} />
                </div>
            </Router>
        );
    }
}

export default RootRouter;
