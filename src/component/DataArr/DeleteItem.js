import React, { Component } from 'react';
import actionTypes from '../../reducer/action-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';

class DeleteItem extends Component {
    onClick = () => {
        let { item, data } = this.props;
        let courseware = data['courseware'];
        courseware.splice(item['id']-1, 1);
        for (let i = 0, len2 = courseware.length; i < len2; i++) {
            courseware[i]['id'] = i + 1;
            // courseware[i]['page'] = i;
        }
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: courseware
        });
    }
    render() {
        let { item } = this.props;
        return (
            <div className="title">
                <div>
                    <span className='title-item'>id:{item['id']}</span>
                    <span className='title-item'>type:{item['type']}</span>
                </div>
                <Button type="primary" onClick={this.onClick} >删除</Button>
            </div>
        );
    }

}

function mapStateToProps(state, ) {
    let data = state['header'].get('initData').toJS();
    return {
        data
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItem);