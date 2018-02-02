import React, { Component } from 'react';
import Login from './login/login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import types from '../reducer/action-types';
import network from '../util/network';
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


    render() {
        let {
            user,
            token,
            userList
        } = this.props;


        if (user) {
            return (
                <div >
                    <Setting />
                    {userList ? userList.map((item, ind) => {
                        return (
                            <div key={ind}>{item.username}</div>
                        )
                    }) : null}
                    <div onClick={() => {
                        this.props.doGeAllUsers();
                    }}>
                        用户列表</div>
                    <div onClick={() => {
                        this.props.dispatch({
                            type: types.USER_LOGOUT
                        });
                    }}>
                        登出用户
                    </div>
                    <div>
                        电话:{user['mobile']}
                    </div>
                    <div>
                        名号:{user['username']}
                    </div>
                    <div>
                        token:{token}
                    </div>
                </div>
            )
        } else {
            return (
                <Login />
            );
        }
    }
}

function mapStateToProps(state, ) {
    let userInfo = state['userInfo'].toJS();
    let {
        user,
        token,
        userList
    } = userInfo;

    return {
        user,
        token,
        userList
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

