import React, { Component } from 'react';
import { Button } from 'antd';
import network from '../../util/network';
import actionTypes from '../../reducer/action-types';
import message from '../../util/message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



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
            this.props.dispatch({
                type: actionTypes.GET_IMAGES_META_DATA,
                payload: res
            });
        });
    }
    handleClick = () => {
        network().get('/images', {}, (res) => {
            this.setState({
                data: res
            });
            console.log(res);
            this.props.dispatch({
                type: actionTypes.GET_IMAGES_META_DATA,
                payload: res
            });
        });

    }
    render() {

        let data = this.state.data;
        let env = process.env.NODE_ENV;


        return (
            <div className='pic-detail-box'>
                <div className="header"><Button type="primary" className="btn" onClick={this.handleClick}>刷新图片</Button></div>
                <div className="content">
                    {data.map((item, index) => {
                        let url = env === 'development' ? 'api' + item['url'] : item['url'];
                        return (<div className="content-item" key={index}>
                            <span>{item['name']}</span>
                            <span><i>宽:</i>{item['w']}</span>
                            <span><i>高:</i>{item['h']}</span>
                            <span className="img-span"><img src={url} key={index} alt='' /></span>
                        </div>);
                    })}


                </div>
            </div>

        );
    }

}

function mapStateToProps(state, ) {
    let data = state['header'].get('initData').toJS();
    return {
        data
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

export default connect(mapStateToProps, mapDispatchToProps)(PicDetails);