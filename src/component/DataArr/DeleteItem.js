import React, { Component } from 'react';
import actionTypes from '../../reducer/action-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, Menu, Icon } from 'antd';

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
    onCopy = () => {
        let { item } = this.props;
        this.props.dispatch({
            type: actionTypes.HEADER_COPY_COURSEWARE,
            payload: item
        });
    }
    onPaste = () => {
        let { copy, data, item } = this.props;
        let courseware = data['courseware'];
        courseware[item['id']-1]['type'] = copy['type'];
        courseware[item['id']-1]['data'] = copy['data'];
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: courseware
        });
    }
    changeQuestionType = (e) => {
        let { item, data } = this.props;
        let courseware = data['courseware'];
        let tempData = {
            "text": item['data']['text'],
            "title": item['data']['title'],
            "other_images": item['data']['other_images'],
            "body": item['data']['body'],
            "timeout": item['data']['timeout']
        }
        const type = e.key;
        var temp = {};
        temp['data'] = tempData;
        temp['id'] = item['id'];
        temp['type'] = type;
        
        if (type === 'read') {
            temp['data']['css_images'] = [];
    
            temp['read_type'] = 'sentence';
            temp['read_content'] = 'Hello';
        }
        if (type === 'jigsaw' || type === 'cation') {
            temp['data']['groupA'] = [];
            temp['data']['groupB'] = [];
        }
    
        if (type === 'choice') {
            temp['data']['answer'] = 0;
        }
    
        if (type === 'multiselect') {
            temp['data']['answer'] = [];
        }
        if (type === 'newdraw' || type === 'raildraw') {
            temp['data']['Pdata'] = [];
            temp['data']['name'] = '';
        }
    
        if (type === 'playvoice') {
            temp['data']['playVoiceArr'] = [];
        }
    
        if (type === 'raildraw') {
            temp['data']['letterColorOne'] = '#ffffff';
            temp['data']['letterColorTwo'] = '#965D11';
            temp['data']['config'] = {
                scale: 2,
                px: 160,
                py: 0,
                color: '#965D11'
            };
        }
        courseware[item['id']-1] = temp;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: courseware
        });
        console.log('changeQuestionType', e.key)
    }
    render() {
        const menu = (
            <Menu onClick={this.changeQuestionType}>
                <Menu.Item key="display">display:展示</Menu.Item>
                <Menu.Item key="cation">cation:分类</Menu.Item>
                <Menu.Item key="jigsaw">jigsaw:拼图</Menu.Item>
                <Menu.Item key="read">read:跟读</Menu.Item>
                <Menu.Item key="survey">survey:问卷</Menu.Item>
                <Menu.Item key="choice">choice:单选</Menu.Item>
                <Menu.Item key="multiselect">multiselect:多选</Menu.Item>
                <Menu.Item key="raildraw">raildraw:写字母--tracing</Menu.Item>
            </Menu>
        );
        let { item } = this.props;
        return (
            <div className="title">
                <div>
                    <span className='title-item'>id:{item['id']}</span>
                    <span className='title-item'>type:{item['type']}</span>
                </div>
                <Dropdown overlay={menu}>
                    <Button type="primary">
                        修改题型为 <Icon type="down" />
                    </Button>
                </Dropdown>
                <Button type="primary" onClick={this.onCopy} >复制</Button>
                <Button type="primary" onClick={this.onPaste} >粘贴</Button>
                <Button type="primary" onClick={this.onClick} >删除</Button>
            </div>
        );
    }

}

function mapStateToProps(state, ) {
    let data = state['header'].get('initData').toJS();
    let copy = state['header'].get('copy').toJS();
    return {
        data,
        copy
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