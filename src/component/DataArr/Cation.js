import React, { Component } from 'react';
import DeleteItem from './DeleteItem';
import { Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionTypes from '../../reducer/action-types';

class Cation extends Component {
    constructor() {
        super();
        this.state = {
            isCenterX: false
        };
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
            pos['x'] = (1024 - val) / 2.00;
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
    changeImageT = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        data['data']['title_img'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    blurChangeImageT = (e) => {
        let { initData, data } = this.props;
        let val = e.target.value;
        val = (val || '').trim();
        data['data']['title_img'] = val;
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //titleImage
    delImage = () => {
        let { initData, data } = this.props;
        data['data']['title_img'] = '';
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
                pos[w] = (1024 - val) / 2.000;
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

    changeAnswer = (item, e) => {
        let { initData, data } = this.props;
        let val = e.target.value;

        item['answer'] = [val];
        let courseware = initData['courseware'];
        courseware[data['page']] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    blurChangeAnswer = (item, e) => {

        let { initData, data } = this.props;
        let val = e.target.value;
        let reg = new RegExp(' ', 'g');
        val = (val || '').replace(reg, '');
        val = val.split(',');
        let valArr = [];
        val = val.map((item) => {
            item = parseInt(item);
            if (!isNaN(item)) {
                valArr.push(item);
            }
            return item;
        });

        item['answer'] = valArr;
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
                        <span>data.title_img和data.text_pos</span>
                    </div>
                    <div className="display-image-box">

                        <div className="image-item image-item-pic">
                            <span >title_img:</span>
                            <Input value={data['data']['title_img']} onChange={this.changeImageT} onBlur={this.blurChangeImageT} />
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
                            <Button type="primary" onClick={this.delImage}>删除title_img图片</Button>
                        </div>
                    </div>

                    <div className="display-body-title">
                        <span>data.groupA</span>
                        <Button type="primary" onClick={this.addBodyImg.bind(this, data['data']['groupA'], 'groupA')}>添加图片</Button>
                    </div>
                    {data['data']['groupA'].map((item, index) => {
                        return (
                            <div key={index} className="display-image-box">
                                <div>索引:{index}</div>
                                <div className="image-item image-item-pic">
                                    <span >image:</span>
                                    <Input value={item['image']} onChange={this.changeImage.bind(this, item)} onBlur={this.onBlurChangeImage.bind(this, item)} />
                                </div>

                                <div className="image-item image-item-pic">
                                    <span >answer:</span>
                                    <Input value={item['answer'].join(',')} onChange={this.changeAnswer.bind(this, item)} onBlur={this.blurChangeAnswer.bind(this, item)} />
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
                                <div className="image-item ">
                                    <Button type="primary" onClick={this.delBodyImg.bind(this, item, 'groupA')}>删除图片</Button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="display-body-title">
                        <span>data.groupB这是拖动项</span>
                        <Button type="primary" onClick={this.addBodyImg.bind(this, data['data']['groupB'], 'groupB')}>添加图片</Button>
                    </div>
                    {data['data']['groupB'].map((item, index) => {
                        return (
                            <div key={index} className="display-image-box">
                                <div>索引:{index}</div>
                                <div className="image-item image-item-pic">
                                    <span >image:</span>
                                    <Input value={item['image']} onChange={this.changeImage.bind(this, item)} onBlur={this.onBlurChangeImage.bind(this, item)} />
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
                                <div className="image-item ">
                                    <Button type="primary" onClick={this.delBodyImg.bind(this, item, 'groupB')}>删除图片</Button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="display-body-title">
                        <span>data.item</span>
                        <Button type="primary" onClick={this.addBodyImg.bind(this, data['data']['item'], 'item')}>添加图片</Button>
                    </div>

                    {data['data']['item'].map((item, index) => {
                        return (
                            <div key={index} className="display-image-box">
                                <div>索引:{index}</div>
                                <div className="image-item image-item-pic">
                                    <span >image:</span>
                                    <Input value={item['image']} onChange={this.changeImage.bind(this, item)} onBlur={this.onBlurChangeImage.bind(this, item)} />
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
                                <div className="image-item ">
                                    <Button type="primary" onClick={this.delBodyImg.bind(this, item, 'item')}>删除图片</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cation);