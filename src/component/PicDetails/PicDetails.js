import React, { Component } from 'react';
import { Button } from 'antd';
import network from '../../util/network';



class PicDetails extends Component {
    constructor() {
        super();
        this.state = {
            data: []
           
        }
    }
    componentWillMount() {
        network().get('/images', {}, (res) => {
            this.setState({
                data: res
            });
        });
    }
    handleClick = () => {
        network().get('/images', {}, (res) => {
            this.setState({
                data: res
            });
        });

    }
    render() {
        
        let data = this.state.data;
        return (
            <div className='pic-detail-box'>
                <div className="header"><Button type="primary" className="btn" onClick={this.handleClick}>刷新图片</Button></div>
                <div className="content">
                    {data.map((item, index) => {
                        return (<div className="content-item" key={index}>
                            <span>{item['name']}</span>
                            <span><i>宽:</i>{item['w']}</span>
                            <span><i>高:</i>{item['h']}</span>
                            <span className="img-span"><img src={item['url']} key={index} alt=''/></span>
                        </div>);
                    })}


                </div>
            </div>

        );
    }

}

export default PicDetails;