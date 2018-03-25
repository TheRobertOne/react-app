import React, { Component } from 'react';

import DeleteItem from './DeleteItem';

class Choice extends Component {


    render() {
        let { data } = this.props;
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />
                Choice
            </div>

        );
    }

}

export default Choice;