import React, { Component } from 'react';
class AppChild extends Component {
    constructor() {
        super();
        this.state = {
            name: '张三 你美啊'
        }
    }
    render() {
        let { name } = this.state;
        return (
            <div >
                <div onClick={() => {
                    this.setState({
                        name: "you ni zhen hao"
                        
                    });
                }}>{name}</div>
                <div>hello</div>
           
               
                <div>nice to meet you </div>
            </div>
        );
    }
}

export default AppChild;