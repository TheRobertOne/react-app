import React, { Component } from 'react';
class AppChild extends Component {
    constructor() {
        super();
        this.state = {
            name: '张三 你美啊'
        }
    }
    componentWillMount(){
        console.log("will hhh mount")
        console.log("nnn nnn nnn ")
    }
    render() {
        let { name } = this.state;
        return (
            <div >
                <div onClick={() => {
                    this.setState({
                        name: "李四网络o"
                        
                    });
                }}>{name}</div>
                <div>hello</div>
           
               
                <div>nice to meet you </div>
            </div>
        );
    }
}

export default AppChild;