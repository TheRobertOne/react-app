import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    },
    {
        type: 'multiselect',
        value: 'multiselect:多选'
    },
    {
        type: 'newdraw',
        value: 'newdraw:新写字题'
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
        let addItem = {
            "type": type,
            "id": 4,

            "data": {
                "title": [],
                "other_images": [],
                "body": [],
                "timeout": 9
            }
        };
        if (type === 'read') {
            addItem['data']['css_images'] = [];

            addItem['read_type'] = 'sentence';
            addItem['read_content'] = 'Hello';
        }
        if (type === 'jigsaw' || type === 'cation') {
            addItem['data']['groupA'] = [];
            addItem['data']['groupB'] = [];
        }

        if (type === 'choice') {
            addItem['data']['answer'] = 0;
        }

        if (type === 'multiselect') {
            addItem['data']['answer'] = [];
        }





        if (isNaN(index)) {
            courseware.push(addItem);
        } else {
            //0 放在第一位 类推
            courseware.splice(index, 0, addItem);
        }

        for (let i = 0, len2 = courseware.length; i < len2; i++) {
            courseware[i]['id'] = i + 1;

        }

        console.log(addItem);

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
    changeId = (e) => {
        let val = (e.target.value || '').trim();
        val = parseInt(val, 10);
        val = isNaN(val) ? 0 : val;
        this.props.dispatch({
            type: actionTypes.GO_TO_ID,
            payload: val
        });
    }
    goToNextId = (wh) => {
        let { gotoId } = this.props;
        if (wh === 'all') {
            gotoId = 0;
        } else {
            if (wh === 'p') {
                gotoId -= 1;
            } else {
                gotoId += 1;
            }
        }

        this.props.dispatch({
            type: actionTypes.GO_TO_ID,
            payload: gotoId
        });
    }

    render() {
        let { data, gotoId } = this.props;
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
                    <div className="header-item">

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
                    <div className="header-item">
                        <span className="header-item-title">搜索:</span>
                        <Input onChange={this.changeId} className='header-item-index header-item-id' placeholder='定位到id' />
                        <span className="header-item-title header-item-search">id:{gotoId}</span>
                        <span className="header-item-title header-item-search">总数:{data['courseware'].length}</span>
                        <Button type="primary" onClick={this.goToNextId.bind(this, 'p')} className="header-item-next">上一个</Button>
                        <Button type="primary" onClick={this.goToNextId.bind(this, 'n')} className="header-item-next"> 下一个</Button>
                        <Button type="primary" onClick={this.goToNextId.bind(this, 'all')} className="header-item-next">显示全部</Button>

                    </div>
                </div>
            </div>

        );
    }

}

function mapStateToProps(state, ) {
    let data = state['header'].get('initData').toJS();
    let gotoId = state['header'].get('gotoId');
    return {
        data,
        gotoId
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