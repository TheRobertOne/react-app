import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import datatype from './datatype';
import _ from 'lodash';
import { Input, Select, Button } from 'antd';
import network from '../../util/network';
import actionTypes from '../../reducer/action-types';
import message from '../../util/message';

const Option = Select.Option;
let typeArr = [
    {
        type: 'display',
        value: 'display:展示'
    },
    {
        type: 'cation',
        value: 'cation:分类'
    },
    {
        type: 'drow',
        value: 'drow:笔画大写A'
    },
    {
        type: 'jigsaw',
        value: 'jigsaw:拼图'
    },
    {
        type: 'read',
        value: 'read:跟读'
    },
    {
        type: 'survey',
        value: 'survey:问卷'
    },
    {
        type: 'choice',
        value: 'choice:单选'
    }
];

class Header extends Component {
    constructor() {
        super();
        this.state = {
            type: 'display',
            index: ''
        };
    }
    //题型改变
    handleTypeChange = (value) => {

        this.setState({
            type: value
        });

    }
    //添加一条数据
    handleAdd = () => {
        let { data } = this.props;
        let courseware = data['courseware'];
        let { type, index } = this.state;
        index = (index || '').trim();
        index = parseInt(index, 10);
        let addItem = _.cloneDeep(datatype[type]);

        if (isNaN(index)) {
            courseware.push(addItem);
        } else {
            //0 放在第一位 类推
            courseware.splice(index, 0, addItem);
        }

        for (let i = 0, len2 = courseware.length; i < len2; i++) {
            courseware[i]['id'] = i + 1;
            courseware[i]['page'] = i;
        }
        message.success('添加id:' + addItem['id'] + '类型:' + addItem['type'])

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: courseware
        });

    }
    //清空
    handleClear = () => {
        this.setState({
            type: 'display',
            index: ''
        });
        network().get('./initdata.json', {}, (res) => {

            this.props.dispatch({
                type: actionTypes.HEADER_INIT_DATA,
                payload: res
            });
        });
    }
    //初始化数据-----读取已经有的数据
    handleInit = () => {
        network().get('./outdata.json', {}, (res) => {

            this.props.dispatch({
                type: actionTypes.HEADER_INIT_DATA,
                payload: res
            });
        });
    }
    //课程标题
    handleTitleChange = (e) => {

        this.props.dispatch({
            type: actionTypes.HEADER_CHANGE_TITLE,
            payload: e.target.value
        });
    }
    //课程主要内容
    handleLessonPointChange = (e) => {

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_LESSON_DETAIL,
            payload: e.target.value
        });
    }
    //插入位置
    handleIndex = (e) => {
        this.setState({
            index: e.target.value
        });
    }
    //生成数据
    genData = () => {
        let { data } = this.props;
        network().post('/generate', data, (res) => {

            message.success('生成数据成功');
        })
    }
    render() {
        let { data } = this.props;
        return (
            <div className="header-box">
                <div className="app-header-box">
                    <div className="header-item">
                        <span className="header-item-title">插入位置(默认插入到最后，0插入到第一位):</span>
                        <Input placeholder="插入位置" className="header-item-index" onChange={this.handleIndex} value={this.state.index} />
                    </div>
                    <div className="header-item">
                        <span className="header-item-title">题型:</span>
                        <Select placeholder="选择题型" className="header-item-index" onChange={this.handleTypeChange} value={this.state.type}>
                            {typeArr.map((item, index) => {
                                return <Option value={item['type']} key={index}>{item['value']}</Option>
                            })}
                        </Select>
                        <Button type="primary" onClick={this.handleAdd}>添加</Button>
                    </div>
                    <div className="header-item">
                        <Button type="primary" onClick={this.genData}>生成数据</Button>
                    </div>
                    <div className="header-item">
                        <Button type="primary" onClick={this.handleClear}>清空</Button>
                    </div>
                    <div className="header-item">
                        <Button type="primary" onClick={this.handleInit}>初始化数据</Button>
                    </div>
                </div>
                <div className="app-header-box">
                    <div className="header-item">
                        <span className="header-item-title">标题:</span>
                        <Input placeholder="输入标题" className="header-item-index header-item-learn-title" onChange={this.handleTitleChange} value={data['lesson_title']} />
                    </div>
                    <div className="header-item">
                        <span className="header-item-title">学习要点:</span>
                        <Input placeholder="输入学习要点" className="header-item-index header-item-learn-detail" onChange={this.handleLessonPointChange} value={data['lesson_points']} />
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);