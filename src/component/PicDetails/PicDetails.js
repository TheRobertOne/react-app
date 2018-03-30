import React, { Component } from 'react';
import { Button, Input } from 'antd';
import network from '../../util/network';
import actionTypes from '../../reducer/action-types';
import message from '../../util/message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class PicDetails extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            filterStr: ''
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
    bindFilterData = (e) => {
        this.setState({
            filterStr: (e.target.value || '').trim()
        });

    }
    render() {

        let data = this.state.data;
        let env = process.env.NODE_ENV;


        return (
            <div className='pic-detail-box'>
                <div className="header">
                    
                    <Input onChange={this.bindFilterData} placeholder="过滤图片" />
                    <Button type="primary" className="btn" onClick={this.handleClick}>刷新图片</Button>
                </div>
                <div className="content">
                    {data.map((item, index) => {
                        if (item['name'].indexOf(this.state.filterStr) != -1) {
                            let url = env === 'development' ? 'api' + item['url'] : item['url'];
                            return (<div className="content-item" key={index}>
                                <span>{item['name']}</span>
                                <span><i>宽:</i>{item['w']}</span>
                                <span><i>高:</i>{item['h']}</span>
                                <span className="img-span"><img src={url} key={index} alt='' /></span>
                            </div>);
                        } else {
                            return null;
                        }

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