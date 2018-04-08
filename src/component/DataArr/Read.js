import React, { Component } from 'react';
import { Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionTypes from '../../reducer/action-types';
import DeleteItem from './DeleteItem';

class Read extends Component {
    constructor() {
        super();
        this.state = {
            checkedTextX: false
        }
    }
    changeContentAndText = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        data['content'] = val;
        data['data']['text'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    changeTextImage = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        data['data']['text_Image'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    blurChangeTextImage = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        val = (val || '').trim();
        data['data']['text_Image'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    textPosX = (pos, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        pos['x'] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    blurTextPosX = (pos, e) => {
        let { checkedTextX } = this.state;
        let { initData } = this.props;
        let val = (e.target.value || '').trim();
        val = parseFloat(val);
        val = isNaN(val) ? 0 : val;

        if (checkedTextX) {
            pos['x'] = (1024 - val) / 2.00;
        } else {
            pos['x'] = val;
        }

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    textPosY = (pos, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        pos['y'] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    blurTextPosY = (pos, e) => {
        let { initData } = this.props;
        let val = (e.target.value || '').trim();
        val = parseFloat(val);
        val = isNaN(val) ? 0 : val;

        pos['y'] = val;

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    checkedTextXChange = (e) => {
        let checked = e.target.checked;
        this.setState({
            checkedTextX: checked
        });
    }
    delTextImage = () => {
        let { initData, data } = this.props;
        data['data']['text_Image'] = '';
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }

    delImage = () => {
        let { initData, data } = this.props;
        data['data']['image'] = '';
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //改变pos.x坐标
    changePos = (pos, wh, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        pos[wh] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }

    //
    onBlurChangePos = (pos, wh, e) => {
        let { isCenterX } = this.state;
        let { initData } = this.props;
        let val = (e.target.value || '').trim();
        val = parseFloat(val);
        val = isNaN(val) ? 0 : val;

        if (isCenterX) {
            pos[wh] = (1024 - val) / 2.00;
        } else {
            pos[wh] = val;
        }

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //改变图片
    changeImage = (dataBodyItem, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        dataBodyItem['image'] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //
    //
    onBlurChangeImage = (dataBodyItem, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        dataBodyItem['image'] = (val || '').trim();
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //删除图片
    delBodyImg = (item, wh) => {

        let { initData, data } = this.props;
        let groupA = data['data'][wh];

        let len = groupA.length;
        let newArr = [];
        for (let i = 0; i < len; i++) {
            if (groupA[i] !== item) {
                newArr.push(groupA[i]);
            }
        }
        data['data'][wh] = newArr;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //添加图片
    addBodyImg = (dataBody, wh) => {

        let { initData, data } = this.props;
        let groupA = data['data'][wh];
        let imgObj;
        if (wh === 'groupA') {
            imgObj = {
                "image": "",
                "pos": { "x": 0, "y": 0 },
                "answer": []
            }
        } else {

            imgObj = { "image": "", "pos": { "x": 0, "y": 0 } };
        }
        groupA.push(imgObj);
        data['data'][wh] = groupA;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    render() {
        let { data } = this.props;

        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />

                <div>
                    <div className="display-image-box">
                        <div className="image-item image-item-pic">
                            <span >跟读内容必填:content和data.text</span>
                            <Input value={data['content']} onChange={this.changeContentAndText} />
                        </div>
                        <div className="image-item image-item-pic">
                            <span >text_Image:</span>
                            <Input value={data['data']['text_Image']} onChange={this.changeTextImage} onBlur={this.blurChangeTextImage} />
                        </div>
                        <div className="image-item">
                            <span >text_pos:x</span>
                            <Input value={data['data']['text_pos']['x']} onChange={this.textPosX.bind(this, data['data']['text_pos'])} onBlur={this.blurTextPosX.bind(this, data['data']['text_pos'])} />
                        </div>
                        <div className="image-item">
                            <Checkbox checked={this.state.checkedTextX} onChange={this.checkedTextXChange}>居中x</Checkbox>
                        </div>
                        <div className="image-item">
                            <span >text_pos:y</span>
                            <Input value={data['data']['text_pos']['y']} onChange={this.textPosY.bind(this, data['data']['text_pos'])} onBlur={this.blurTextPosY.bind(this, data['data']['text_pos'])} />
                        </div>
                        <div className="image-item">
                            <Button type="primary" onClick={this.delTextImage}>删除text_Image图片</Button>
                        </div>
                    </div>

                    <div className="display-body-title">
                        <span>data.other_images</span>
                        <Button type="primary" onClick={this.addBodyImg.bind(this, data['data']['other_images'], 'other_images')}>添加图片</Button>
                    </div>

                    {data['data']['other_images'].map((item, index) => {
                        return (
                            <div key={index} className="display-image-box">
                                <div>索引:{index}</div>
                                <div className="image-item image-item-pic">
                                    <span >image:</span>
                                    <Input value={item['image']} onChange={this.changeImage.bind(this, item)} onBlur={this.onBlurChangeImage.bind(this, item)} />
                                </div>
                                
                                <div className="image-item">
                                    <span >pos:x</span>
                                    <Input value={item['pos']['x']} onChange={this.changePos.bind(this, item['pos'], 'x')} onBlur={this.onBlurChangePos.bind(this, item['pos'], 'x')} />
                                </div>
                                <div className="image-item">
                                    <span >pos:y</span>
                                    <Input value={item['pos']['y']} onChange={this.changePos.bind(this, item['pos'], 'y')} onBlur={this.onBlurChangePos.bind(this, item['pos'], 'y')} />
                                </div>


                                <div className="image-item ">
                                    <Button type="primary" onClick={this.delBodyImg.bind(this, item, 'other_images')}>删除图片</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        );
    }

}

function mapStateToProps(state, ) {
    let initData = state['header'].get('initData').toJS();
    return {
        initData
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

export default connect(mapStateToProps, mapDispatchToProps)(Read);