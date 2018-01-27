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
    getData = (url) => {

        netWork.get(url, (json) => {
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

        return (
            <div >
                <input onChange={(e) => {
                    this.setState({
                        url: e.target.value
                    });
                }} />
                <div onClick={this.getData.bind(this, this.state.url)}>获取数据</div>
                <div>
                    {this.renderHtml()}
                </div>
            </div>
        );
    }
}

export default App;

