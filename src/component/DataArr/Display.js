import React, { Component } from 'react';
import DeleteItem from './DeleteItem';
import { Input, Button, Checkbox } from 'antd';


class Display extends Component {
    constructor() {
        super();
        this.state = {
            isCenterX: false
        };
    }
    //改变图片
    changeImage = () => {

    }
    //改变pos.x坐标
    changePosX = () => {

    }
    //改变pos.y坐标
    changePosY = () => {

    }
    //居中pos.x坐标
    centerX = (e) => {
        let checked = e.target.checked;
        this.setState({
            isCenterX: checked
        });
    }
    render() {

        let { data } = this.props;
        console.log(data);
        console.log(this.state.isCenterX);
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />

                <div>
                    <div className="display-body-title">
                        <span>body</span>
                        <Button type="primary">添加图片</Button>
                    </div>
                    {data['data']['body'].map((item, index) => {
                        return (
                            <div key={index} className="display-image-box">
                                <div className="image-item">
                                    <span >image:</span>
                                    <Input value={item['image']} onChange={this.changeImage} />
                                </div>
                                <div className="image-item">
                                    <span >pos:x</span>
                                    <Input value={item['pos']['x']} onChange={this.changePosX} />
                                </div>
                                <div className="image-item">
                                    <span >pos:y</span>
                                    <Input value={item['pos']['y']} onChange={this.changePosY} />
                                </div>
                                <div className="image-item">
                                    <Checkbox onChange={this.centerX} checked={this.state.isCenterX}>居中x</Checkbox>
                                </div>
                                <div className="image-item">
                                    <Button type="primary">删除图片</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        );
    }

}

export default Display;