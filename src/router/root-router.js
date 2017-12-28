import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import App from '../component/app';
import SayHello from '../component/say-hello';
class RootRouter extends Component {
   
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/say" component={SayHello} />
                </div>
            </Router>
        );
    }
}

export default RootRouter;
