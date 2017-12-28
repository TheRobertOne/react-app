import React, { Component } from 'react';
import { connect } from 'react-redux';
class SayHello extends Component {

    render() {
        return (
            <div>
                {this.props.chatmessage}
                <div>发货分身乏术发啦哈哈 那繁华</div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    // let state = $$state.toJS();

    let chatLog = state['chatLog'].toJS();
    let {
        chatmessage
    } = chatLog;
    return {
        chatmessage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SayHello);