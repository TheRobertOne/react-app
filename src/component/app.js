import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import types from '../reducer/action-types';


class App extends Component {
    constructor() {
        super();
        this.state = {
        };
    }



    render() {


        return (
            <div className="app">
                <div className="app-header">tou</div>
                <div className="app-content">
                    <div className="app-content-left">
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
                       <div>le</div><div>le</div><div>le</div><div>le</div><div>le</div>
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

