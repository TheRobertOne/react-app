import React, { Component } from 'react';
import datatype from './datatype';
import _ from 'lodash';
import { Input, Select, Button } from 'antd';
import network from '../../util/network';

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


    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    handleAdd = () => {
        console.log(datatype);
        console.log(_);

    }
    //清空
    handleClear = () => {
        network().get('./initdata.json', {}, (res) => {
            console.log(res);
        });
    }
    //初始化数据-----读取已经有的数据
    handleInit = () => {
        network().get('./outdata.json', {}, (res) => {
            console.log(res);
        });
    }
    render() {
        return (
            <div className="header-box">
                <div className="app-header-box">
                    <div className="header-item">
                        <span className="header-item-title">插入位置(默认插入到最后，0插入到第一位):</span>
                        <Input placeholder="插入位置" className="header-item-index" />
                    </div>
                    <div className="header-item">
                        <span className="header-item-title">题型:</span>
                        <Select placeholder="选择题型" className="header-item-index" onChange={this.handleChange}>
                            {typeArr.map((item, index) => {
                                return <Option value={item['type']} key={index}>{item['value']}</Option>
                            })}
                        </Select>
                        <Button type="primary" onClick={this.handleAdd}>添加</Button>
                    </div>
                    <div className="header-item">
                        <Button type="primary">生成数据</Button>
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
                        <Input placeholder="输入标题" className="header-item-index" />
                    </div>
                    <div className="header-item">
                        <span className="header-item-title">学习要点:</span>
                        <Input placeholder="输入学习要点" className="header-item-index" />
                    </div>
                </div>
            </div>

        );
    }

}

export default Header;