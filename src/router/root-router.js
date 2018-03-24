import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import App from '../component/app';

class RootRouter extends Component {
    componentDidMount() {
       
    }
    render() {
        return (
            <Router>
                <div className="router-box">
                    <Route exact path="/" component={App} />
                </div>
            </Router>
        );
    }
}

export default connect()(RootRouter);
