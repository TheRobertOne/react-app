import React, { Component } from 'react';
import Login from './login/login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './common/header/index';
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
    render() {


        return (
            <div >
                <Header />
                <Setting />


                <div onClick={() => {
                    this.props.dispatch({
                        type: types.USER_LOGOUT
                    });
                }}>
                    登出用户
                </div>
                {this.userInfo()}
            </div>
        );

    }
}

function mapStateToProps(state, ) {
    let userInfo = state['userInfo'].toJS();

    return {
        ...userInfo
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

