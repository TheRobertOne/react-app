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
        let env  = process.env.NODE_ENV;

       
        return (
            <div className='pic-detail-box'>
                <div className="header"><Button type="primary" className="btn" onClick={this.handleClick}>刷新图片jj</Button></div>
                <div className="content">
                    {data.map((item, index) => {
                        let url = env==='development'?'api'+item['url']:item['url'];
                        return (<div className="content-item" key={index}>
                            <span>{item['name']}</span>
                            <span><i>宽:</i>{item['w']}</span>
                            <span><i>高:</i>{item['h']}</span>
                            <span className="img-span"><img src={url} key={index} alt=''/></span>
                        </div>);
                    })}


                </div>
            </div>

        );
    }

}

export default PicDetails;