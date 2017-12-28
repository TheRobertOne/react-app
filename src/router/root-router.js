import React, { Component } from 'react';
import {
    MemoryRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import App from '../component/app';
import SayHello from '../component/say-hello';
class RootRouter extends Component {

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/say">say</Link></li>
                    </ul>
                    <Route exact path="/" component={App} />
                    <Route path="/say" component={SayHello} />
                </div>
            </Router>
        );
    }
}

export default RootRouter;
