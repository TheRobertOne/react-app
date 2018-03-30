import React, { Component } from 'react';
import { Button, Input, message } from 'antd';
import network from '../../util/network';
import actionTypes from '../../reducer/action-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

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
    handleCopy = (text, e) => {
        copyTextToClipboard(text);
        message.success(text);
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
                                <span className="copy-pic-url" onClick={this.handleCopy.bind(this, item['name'])}>复制</span>
                                <span className="copy-pic-url" onClick={this.handleCopy.bind(this, item['w'])}><i>宽:</i>{item['w']}</span>
                                <span className="copy-pic-url" onClick={this.handleCopy.bind(this, item['h'])}><i>高:</i>{item['h']}</span>
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