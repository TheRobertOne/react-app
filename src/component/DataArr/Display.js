import React, { Component } from 'react';
import DeleteItem from './DeleteItem';
import { Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionTypes from '../../reducer/action-types';
import message from '../../util/message';
import letters from '../Header/letter/';

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
        let { initData, data } = this.props;
        let type = data['type'];

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

        if (type === 'playvoice') {
            pos['name'] = val;
        }

        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });


    }


    //删除图片
    delBodyImg = (item, key) => {

        let { initData, data } = this.props;
        let body = data['data'][key];

        let len = body.length;
        let newArr = [];
        for (let i = 0; i < len; i++) {
            if (body[i] !== item) {
                newArr.push(body[i]);
            }
        }
        data['data'][key] = newArr;
        let courseware = initData['courseware'];
        courseware[data['id'] - 1] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }
    //添加图片
    addBodyImg = (key) => {

        let { initData, data } = this.props;
        let body = data['data'][key];
        let type = data['type'];
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

        if (key === 'groupA') {

            if (type === 'jigsaw') {
                imgObj['answer'] = 0;
            } else if (type === 'cation') {
                imgObj['answer'] = [];
            }
        }

        body.push(imgObj);
        data['data'][key] = body;
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
    //居中pos.x坐标
    centerX = (e) => {
        let checked = e.target.checked;
        this.setState({
            isCenterX: checked
        });
    }

    arrHtml = (data, key) => {


        let type = this.props.data.type;

        let val = data[key].map((item, index) => {

            return (
                <div key={index} className="display-image-box">


                    <div>索引:{index}</div>

                    <div className="image-item image-item-pic">
                        <span >image:</span>
                        <Input value={item['image']} onChange={this.changePos.bind(this, item, 'image')} onBlur={this.onBlurChangePos.bind(this, item, 'image')} />
                    </div>
                    {this.groupAAnswerHtml(item, type, key)}
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
                        <Checkbox onChange={this.centerX} checked={this.state.isCenterX}>居中x</Checkbox>
                    </div>

                    <div className="image-item image-item-pic">
                        <Button type="primary" onClick={this.delBodyImg.bind(this, item, key)}>删除图片</Button>
                    </div>
                </div>
            );
        });



        return (
            <div>
                <div className="display-body-title">
                    <span>data.{key}</span>
                    <Button type="primary" onClick={this.addBodyImg.bind(this, key)}>添加图片</Button>
                </div>
                {val}
            </div>
        )

    }

    timeoutHtmlValue = (type, key, e) => {
        console.log(key)
        if (type === 'multiselect') {
            let { initData, data } = this.props;
            let val = e.target.value;

            data['data'][key] = [val];
            let courseware = initData['courseware'];
            courseware[data['id'] - 1] = data;

            this.props.dispatch({
                type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
                payload: courseware
            });

        } else {

            let { initData, data } = this.props;
            let val = e.target.value;
            if (type === 'read' && (key === 'read_type' || key === 'read_content')) {
                data[key] = val;
            } else {
                data['data'][key] = val;
            }

            let courseware = initData['courseware'];
            courseware[data['id'] - 1] = data;

            this.props.dispatch({
                type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
                payload: courseware
            });
        }
    }

    timeoutHtmlValueVlurChangeAnswer = (type, key, e) => {
        if (key === 'timeout') {
            let { initData, data } = this.props;
            let val = e.target.value;
            val = (val || '').trim();
            val = parseInt(val, 10);
            if (isNaN(val)) {
                val = 0;
            }
            data['data'][key] = val;
            let courseware = initData['courseware'];
            courseware[data['id'] - 1] = data;

            this.props.dispatch({
                type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
                payload: courseware
            });
        } else {


            if (type === 'choice') {
                let { initData, data } = this.props;
                let val = e.target.value;
                val = (val || '').trim();
                val = parseInt(val, 10);
                if (isNaN(val)) {
                    val = 0;
                }
                data['data'][key] = val;
                let courseware = initData['courseware'];
                courseware[data['id'] - 1] = data;

                this.props.dispatch({
                    type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
                    payload: courseware
                });

            } else if (type === 'multiselect') {
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

                data['data'][key] = valArr;
                let courseware = initData['courseware'];
                courseware[data['id'] - 1] = data;

                this.props.dispatch({
                    type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
                    payload: courseware
                });
            }
        }

    }

    timeoutHtml = (item, key, type) => {

        if (key === 'timeout' || type === 'choice' || type === 'read') {

            return (
                <div>
                    <div className="display-body-title">
                        <div>{key}</div>
                        <div>
                            <Input value={item[key]} onChange={this.timeoutHtmlValue.bind(this, type, key)} onBlur={this.timeoutHtmlValueVlurChangeAnswer.bind(this, type, key)} />
                        </div>
                    </div>

                </div>
            )
        } else {
            if (type === 'multiselect') {
                return (
                    <div className="display-image-box">
                        <div className="image-item image-item-pic">
                            <span >answer:</span>
                            <Input value={item[key].join(',')} onChange={this.timeoutHtmlValue.bind(this, type, key)} onBlur={this.timeoutHtmlValueVlurChangeAnswer.bind(this, type, key)} />
                        </div>
                    </div>
                )

            } else {
                return null;
            }

        }


    }

    //
    changeAnswer = (dataBodyItem, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        dataBodyItem['answer'] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }
    changeAnswercation = (item, e) => {
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
    //jigsaw
    onBlurChangeAnswer = (dataBodyItem, e) => {
        let { initData } = this.props;
        let val = e.target.value;
        val = (val || '').trim();
        val = parseInt(val, 10);
        if (isNaN(val)) {
            val = 0;
        }
        dataBodyItem['answer'] = val;
        this.props.dispatch({
            type: actionTypes.HEADER_CHAGNE_COURSEWARE,
            payload: initData['courseware']
        });
    }

    //cation 

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
        courseware[data['id'] - 1] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }

    groupAAnswerHtml = (item, type, key) => {
        if (key === 'groupA') {



            if (type === 'cation') {
                return (
                    <div className="image-item image-item-pic">
                        <span >answer:</span>
                        <Input value={item['answer'].join(',')} onChange={this.changeAnswercation.bind(this, item)} onBlur={this.blurChangeAnswer.bind(this, item)} />
                    </div>
                );
            } else if (type === 'jigsaw') {
                return (
                    <div className="image-item image-item-pic">
                        <span >answer:</span>
                        <Input value={item['answer']} onChange={this.changeAnswer.bind(this, item)} onBlur={this.onBlurChangeAnswer.bind(this, item)} />
                    </div>
                );
            } else {
                return null;
            }

        } else {
            return null;
        }

    }

    chooseWord = (item) => {

        let { initData, data } = this.props;

        data['data']['Pdata'] = item['Pdata'];
        data['data']['name'] = item['name'];

        let courseware = initData['courseware'];
        courseware[data['id'] - 1] = data;

        this.props.dispatch({
            type: actionTypes.HEADER_DISPLAY_BODY_IMG_CHAGEN,
            payload: courseware
        });
    }

    tracingHtml = (type) => {
        let { data } = this.props;

        console.log(data)

        if (type === 'newdraw' || type === 'raildraw') {

            return (
                <div className="newdraw">
                    <div className="newdraw-word">
                        <div className="newdraw-word-title">选择写的字母:</div>

                        {letters.map((item, index) => {


                            let className = "word-span";
                            if (item['name'] === data.data.name) {
                                className = "word-span word-span-active";
                            }
                            return <span key={index} className={className} onClick={this.chooseWord.bind(this, item)}>{item['name']}</span>
                        })}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }




    render() {

        let { data } = this.props;
        let type = data['type'];



        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />

                {this.tracingHtml(type)}

                {this.timeoutHtml(data['data'], 'timeout', type)}
                {type === 'choice' || type === 'multiselect' ? this.timeoutHtml(data['data'], 'answer', type) : ''}
                {type === 'read' ? this.timeoutHtml(data, 'read_type', type) : ''}
                {type === 'read' ? this.timeoutHtml(data, 'read_content', type) : ''}
                {this.arrHtml(data['data'], 'title')}
                {type === 'playvoice' ? this.arrHtml(data['data'], 'playVoiceArr') : ''}
                {type === 'jigsaw' || type === 'cation' ? this.arrHtml(data['data'], 'groupA') : ''}
                {type === 'jigsaw' || type === 'cation' ? this.arrHtml(data['data'], 'groupB') : ''}
                {type === 'read' ? this.arrHtml(data['data'], 'css_images') : ''}
                {this.arrHtml(data['data'], 'body')}
                {this.arrHtml(data['data'], 'other_images')}



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