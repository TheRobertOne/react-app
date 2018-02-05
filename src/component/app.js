import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './common/header/index';
import DefaultHomePage from './common/default/index';
import types from '../reducer/action-types';
import Setting from './user-center/setting';
import {
    doGeAllUsers
} from '../reducer/user-info';

class App extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    userInfo() {
        let {
            user,
            token
        } = this.props;
        if (user) {
            return (
                <div>
                    <div>
                        电话:{user['mobile']}
                    </div>
                    <div>
                        名号:{user['username']}
                    </div>
                    <div>
                        {token}
                    </div>
                </div>
            );
        }
    }
    renderContent = () => {
        let {
            componentPath
        } = this.props;
        if (componentPath) {
            return <Setting />
        } else {
            return <DefaultHomePage />
        }
    }
    render() {


        return (
            <div className="app">
                <Header />
                <div className="app-content">
                    <div className="app-content-inner">
                        {this.userInfo()}
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state, ) {
    let userInfo = state['userInfo'].toJS();
    let app = state['app'].toJS();

    return {
        ...userInfo,
        ...app
    };
}

function mapDispatchToProps(dispatch) {
    let method = {
        doGeAllUsers
    };
    let boundActionCreators = bindActionCreators(method, dispatch);
    return {
        dispatch,
        ...boundActionCreators
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(App);

