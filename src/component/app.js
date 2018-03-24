import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import types from '../reducer/action-types';
import Header from './Header/index';


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
                        left
                    </div>
                    <div className="app-content-right">
                        right
                    </div>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state, ) {


    return {

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

