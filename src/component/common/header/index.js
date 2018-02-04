import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Search = Input.Search;

class Header extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    onSearchHandler = (v) => {
        v = (v || '').trim();
    }
    renderHeaderRight = () => {
        let {
            user,
            token
        } = this.props;
        if (user) {
            return (
                <div>
                    已经登录😂
                </div>
            );
        } else {
            return (
                <div>
                    为登录
                </div>
            );
        }
    }
    render() {
        return (
            <div className="app-header fn-clear">
                <div className="fn-left app-header-left">
                    <div className="app-icon">书架</div>
                    <div className="app-home">首页</div>
                    <div className="app-search">
                        <Search
                            placeholder="搜索"
                            onSearch={this.onSearchHandler}
                            enterButton
                        />
                    </div>
                </div>
                <div className="fn-right app-header-right">
                    {this.renderHeaderRight()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ) {
    let userInfo = state['userInfo'].toJS();

    return {
        ...userInfo,
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);