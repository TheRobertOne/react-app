import React, { Component } from 'react';
import actionTypes from '../../reducer/action-types';
import DeleteItem from './DeleteItem';
import { Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import message from '../../util/message';

class Choice extends Component {
    constructor() {
        super();
        this.state = {
            checkedTextX: false,
            isCenterX: false
        }
    }
    //改变图片
    changeBodyImage = (dataBodyItem, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        dataBodyItem['image'] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //
    onBlurChangeBodyImage = (dataBodyItem, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        dataBodyItem['image'] = (val || '').trim();
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //size
    changeSize = (size, w, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        size[w] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //size
    onBlurChangeSize = (size, w, e) => {
        let { isCenterX } = this.state;
        let { initData } = this.props;
        let val = (e.target.value || '').trim();
        val = parseFloat(val);
        val = isNaN(val) ? 0 : val;
        size[w] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //改变pos.x坐标
    changePosX = (pos, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        pos['x'] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //
    onBlurChangePosX = (pos, e) => {
        let { isCenterX } = this.state;
        let { initData } = this.props;
        let val = (e.target.value || '').trim();
        val = parseFloat(val);
        val = isNaN(val) ? 0 : val;

        if (isCenterX) {
            pos['x'] = (1280 - val) / 2.00;
        } else {
            pos['x'] = val;
        }

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //改变pos.y坐标
    changePosY = (pos, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        pos['y'] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //
    onBlurChangePosY = (pos, e) => {
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
    //居中pos.x坐标
    centerX = (e) => {
        let checked = e.target.checked;
        this.setState({
            isCenterX: checked
        });
    }
    //删除图片
    delBodyImg = (item) => {

        let { initData, data } = this.props;
        let body = data['data']['body'];

        let len = body.length;
        let newArr = [];
        for (let i = 0; i < len; i++) {
            if (body[i] !== item) {
                newArr.push(body[i]);
            }
        }
        data['data']['body'] = newArr;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //添加图片
    addBodyImg = (dataBody) => {

        let { initData, data } = this.props;
        let body = data['data']['body'];
        let imgObj = {
            "text": "",
            "voice": "",
            "allow": true,
            "image": "", //眼睛
            "pos": {
                "x": 0,
                "y": 0
            },
            "size": {
                "w": 0,
                "h": 0
            }
        };
        body.push(imgObj);
        data['data']['body'] = body;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //titleImage
    changeImage = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        data['data']['titleImage'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //titleImage
    blurChangeImage = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        val = (val || '').trim();
        data['data']['titleImage'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //titleImage pos
    imagePos = (pos, w, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        pos[w] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //titleImage pos
    blurImagePos = (pos, w, e) => {
        let { initData } = this.props;
        let { isCenterX } = this.state;
        let val = (e.target.value || '').trim();
        val = parseFloat(val);
        val = isNaN(val) ? 0 : val;
        if (w === 'x') {

            if (isCenterX) {
                pos[w] = (1280 - val) / 2.000;

            } else {
                pos[w] = val;
            }
        } else {
            pos[w] = val;
        }

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //titleImage
    delImage = () => {
        let { initData, data } = this.props;
        data['data']['titleImage'] = '';
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //answer
    changeAnswer = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        data['data']['answer'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    blurChangeAnswer = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        val = (val || '').trim();
        val = parseInt(val, 10);
        if (isNaN(val)) {
            val = 0;
        }
        data['data']['answer'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    QimagePos = (pos, w, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        pos[w] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    QblurImagePos = (pos, w, e) => {
        let { initData } = this.props;
        let val = (e.target.value || '').trim();
        val = parseFloat(val);
        val = isNaN(val) ? 0 : val;
        pos[w] = val;

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    QdelImage = () => {
        let { initData, data } = this.props;
        data['data']['q_image'] = '';
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //q_image
    QchangeImage = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        data['data']['q_image'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //q_image
    QblurChangeImage = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        val = (val || '').trim();
        data['data']['q_image'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    getSize = (item, e) => {
        let { imagesMetaData, initData } = this.props;
        let len = imagesMetaData.length;
        let flag = true;
        for (let i = 0; i < len; i++) {
            if (item['image'] === imagesMetaData[i]['name']) {
                item['size']['w'] = imagesMetaData[i]['w'];
                item['size']['h'] = imagesMetaData[i]['h'];
                message.success('获取尺寸成功!');
                flag = false;
                break;
            }
        }
        if (flag) {
            message.info('没有该图片尺寸！');
        }

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }

    //添加图片
    addBodyImgOther = (dataBody, wh) => {

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

    //改变图片
    changeImageQ = (dataBodyItem, e) => {
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
    onBlurChangeImageQ = (dataBodyItem, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        dataBodyItem['image'] = (val || '').trim();
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
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
            pos[wh] = (1280 - val) / 2.00;
        } else {
            pos[wh] = val;
        }

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    delOtherImage = (item, wh) => {

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
    render() {
        let { data } = this.props;
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />
                <div>
                    <div className="display-body-title">
                        <span>data.titleImage和data.text_pos</span>
                    </div>
                    <div className="display-image-box">

                        <div className="image-item image-item-pic">
                            <span >titleImage:</span>
                            <Input value={data['data']['titleImage']} onChange={this.changeImage} onBlur={this.blurChangeImage} />
                        </div>
                        <div className="image-item">
                            <span >text_pos:x</span>
                            <Input value={data['data']['text_pos']['x']} onChange={this.imagePos.bind(this, data['data']['text_pos'], 'x')} onBlur={this.blurImagePos.bind(this, data['data']['text_pos'], 'x')} />
                        </div>
                        <div className="image-item">
                            <Checkbox onChange={this.centerX} checked={this.state.isCenterX}>居中x</Checkbox>
                        </div>
                        <div className="image-item">
                            <span >text_pos:y</span>
                            <Input value={data['data']['text_pos']['y']} onChange={this.imagePos.bind(this, data['data']['text_pos'], 'y')} onBlur={this.blurImagePos.bind(this, data['data']['text_pos'], 'y')} />
                        </div>

                        <div className="image-item">
                            <Button type="primary" onClick={this.delImage}>删除titleImage图片</Button>
                        </div>
                    </div>

                    <div className="display-body-title">
                        <span>单选题答案索引:</span>
                    </div>
                    <div className="display-image-box">
                        <div className="image-item">
                            <span >answer:</span>
                            <Input value={data['data']['answer']} onChange={this.changeAnswer} onBlur={this.blurChangeAnswer} />
                        </div>
                    </div>
                    <div className="display-body-title">
                        <span>data.body</span>
                        <Button type="primary" onClick={this.addBodyImg.bind(this, data['data']['body'])}>添加图片</Button>
                    </div>
                    {data['data']['body'].map((item, index) => {
                        return (
                            <div key={index} className="display-image-box">
                                <div>索引:{index}</div>
                                <div className="image-item image-item-pic">
                                    <span >image:</span>
                                    <Input value={item['image']} onChange={this.changeBodyImage.bind(this, item)} onBlur={this.onBlurChangeBodyImage.bind(this, item)} />
                                </div>
                                <div className="image-item">
                                    <span >size:w</span>
                                    <Input value={item['size']['w']} onChange={this.changeSize.bind(this, item['size'], 'w')} onBlur={this.onBlurChangeSize.bind(this, item['size'], 'w')} />
                                </div>
                                <div className="image-item">
                                    <span >size:h</span>
                                    <Input value={item['size']['h']} onChange={this.changeSize.bind(this, item['size'], 'h')} onBlur={this.onBlurChangeSize.bind(this, item['size'], 'h')} />
                                </div>

                                <div className="image-item">
                                    <Button type="primary" onClick={this.getSize.bind(this, item)}>获取尺寸</Button>
                                </div>

                                <div className="image-item">
                                    <span >pos:x</span>
                                    <Input value={item['pos']['x']} onChange={this.changePosX.bind(this, item['pos'])} onBlur={this.onBlurChangePosX.bind(this, item['pos'])} />
                                </div>
                                <div className="image-item">
                                    <span >pos:y</span>
                                    <Input value={item['pos']['y']} onChange={this.changePosY.bind(this, item['pos'])} onBlur={this.onBlurChangePosY.bind(this, item['pos'])} />
                                </div>
                                <div className="image-item">
                                    <Checkbox onChange={this.centerX} checked={this.state.isCenterX}>居中x</Checkbox>
                                </div>
                                <div className="image-item image-item-pic">
                                    <Button type="primary" onClick={this.delBodyImg.bind(this, item)}>删除图片</Button>
                                </div>
                            </div>
                        );
                    })}



                    <div className="display-body-title">
                        <span>data.other_images</span>
                        <Button type="primary" onClick={this.addBodyImgOther.bind(this, data['data']['other_images'], 'other_images')}>添加图片</Button>
                    </div>

                    {data['data']['other_images'].map((item, index) => {


                        return (
                            <div key={index} className="display-image-box">
                                <div>索引:{index}</div>
                                <div className="image-item image-item-pic">
                                    <span >image:</span>
                                    <Input value={item['image']} onChange={this.changeImageQ.bind(this, item)} onBlur={this.onBlurChangeImageQ.bind(this, item)} />
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
                                    <Button type="primary" onClick={this.delOtherImage.bind(this, item, 'other_images')}>删除图片</Button>
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
    let imagesMetaData = state['header'].get('imagesMetaData').toJS();
    return {
        initData,
        imagesMetaData
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

export default connect(mapStateToProps, mapDispatchToProps)(Choice);