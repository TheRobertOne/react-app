import React, { Component } from 'react';
import { Input, Select, Button } from 'antd';
const Option = Select.Option;


class Header extends Component {
    constructor() {
        super();
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    render() {
        return (
            <div>
                <div className="app-header-box">
                    <div className="header-item">
                        <span className="header-item-title">插入位置(默认插入到最后，0插入到第一位):</span>
                        <Input placeholder="插入位置" className="header-item-index" />
                    </div>
                    <div className="header-item">
                        <span className="header-item-title">题型:</span>
                        <Select placeholder="选择题型" className="header-item-index" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                        <Button type="primary">添加</Button>
                    </div>
                    <div className="header-item">
                        <Button type="primary">生成数据</Button>
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