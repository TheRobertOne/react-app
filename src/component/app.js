import React, { Component } from 'react';
import netWork from '../util/network';


class App extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            url: ''
        };
    }
    getData = () => {

        netWork.get('/animals', {id:23,name:'猴子get'}, (json) => {
            this.setState({
                data: json
            });
        })
        netWork.post('/animals', {id:23,name:'猴子post'}, (json) => {
            this.setState({
                data: json
            });
        })
    }

    renderHtml = () => {
        let { data } = this.state;
        if (data) {
            return (
                <div>
                    <div>
                        <span>url:</span>
                        <span>{data['url']}</span>
                    </div>
                    <div>
                        <span>method:</span>
                        <span>{data['method']}</span>
                    </div>
                    <div>
                        <span>time:</span>
                        <span>{data['time']}</span>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
    render() {
        let { data } = this.state;
        return (
            <div >
                {data ? data.map((item, ind) => {
                    return <div key={ind}>{item['name']}</div>
                }) : null}
                <div onClick={this.getData}>获取数据</div>
            </div>
        );
    }
}

export default App;

