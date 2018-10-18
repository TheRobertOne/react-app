import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header/index';
import DataArr from './DataArr/index';
import PicDetails from './PicDetails/PicDetails';
import message from "../util/message";
import network from "../util/network";


class App extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <Header />
                </div>
                <div className="app-content">
                    <div className="app-content-left">
                        <DataArr />
                    </div>
                    <div className="app-content-right">
                        <PicDetails />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let initData = state['header'].get('initData').toJS();
    return {
        initData
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

