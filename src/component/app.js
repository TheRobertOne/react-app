import React, { Component } from 'react';
import Login from './login/login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import types from '../reducer/action-types';
import network from '../util/network';
import Setting from './user-center/setting';

class App extends Component {
    constructor() {
        super();
        this.state = {
            usersList: null
        };
    }


    render() {
        let {
            user,
            token
        } = this.props;
        let {
            usersList
        } = this.state;

        if (user) {
            return (
                <div >
                    <Setting />
                    {usersList ? usersList.map((item, ind) => {
                        return (
                            <div key={ind}>{item.username}</div>
                        )
                    }) : null}
                    <div onClick={() => {
                        network(token).get('/users', (json) => {
                            this.setState({
                                usersList: json
                            });
                        })
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
        token
    } = userInfo;

    return {
        user,
        token
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

