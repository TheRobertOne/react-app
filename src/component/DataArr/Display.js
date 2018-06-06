import React, { Component } from 'react';
import DeleteItem from './DeleteItem';
import { Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionTypes from '../../reducer/action-types';
import message from '../../util/message';

class Display extends Component {
    constructor() {
        super();
        this.state = {
            isCenterX: false
        };
    }

    //改变pos坐标
    changePos = (pos, key, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        pos[key] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    //
    onBlurChangePos = (pos, key, e) => {
        let { isCenterX } = this.state;
        let { initData } = this.props;
        let val = (e.target.value || '').trim();

        if (key !== 'image') {
            val = parseFloat(val);
            val = isNaN(val) ? 0 : val;
        } else {
            this.getSize(pos);
        }



        if (isCenterX) {
            pos[key] = (1280 - val) / 2.00;
        } else {
            pos[key] = val;
        }

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
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
        courseware[data['id'] - 1] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //添加图片
    addBodyImg = () => {

        let { initData, data } = this.props;
        let body = data['data']['body'];
        let imgObj = {
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
        courseware[data['id'] - 1] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }






    getSize = (item) => {
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
    render() {

        let { data } = this.props;

        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />

                <div>
                    <div className="display-body-title">
                        <span>data.body</span>
                        <Button type="primary" onClick={this.addBodyImg.bind(this)}>添加图片</Button>
                    </div>
                    {data['data']['body'].map((item, index) => {

                        return (
                            <div key={index} className="display-image-box">
                                <div>索引:{index}</div>
                                <div className="image-item image-item-pic">
                                    <span >image:</span>
                                    <Input value={item['image']} onChange={this.changePos.bind(this, item, 'image')} onBlur={this.onBlurChangePos.bind(this, item, 'image')} />
                                </div>
                                <div className="image-item">
                                    <span >size:w</span>

                                    <Input value={item['size']['w']} onChange={this.changePos.bind(this, item['size'], 'w')} onBlur={this.onBlurChangePos.bind(this, item['size'], 'w')} />
                                </div>
                                <div className="image-item">
                                    <span >size:h</span>
                                    <Input value={item['size']['h']} onChange={this.changePos.bind(this, item['size'], 'h')} onBlur={this.onBlurChangePos.bind(this, item['size'], 'h')} />
                                </div>

                                <div className="image-item">
                                    <Button type="primary" onClick={this.getSize.bind(this, item)}>获取尺寸</Button>
                                </div>

                                <div className="image-item">
                                    <span >pos:x</span>
                                    <Input value={item['pos']['x']} onChange={this.changePos.bind(this, item['pos'], 'x')} onBlur={this.onBlurChangePos.bind(this, item['pos'], 'x')} />
                                </div>
                                <div className="image-item">
                                    <span >pos:y</span>
                                    <Input value={item['pos']['y']} onChange={this.changePos.bind(this, item['pos'], 'y')} onBlur={this.onBlurChangePos.bind(this, item['pos'], 'y')} />
                                </div>
                                <div className="image-item">
                                    <Checkbox >居中x</Checkbox>
                                </div>
                                <div className="image-item image-item-pic">
                                    <Button type="primary" onClick={this.delBodyImg.bind(this, item)}>删除图片</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Display);