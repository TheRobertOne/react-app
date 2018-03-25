import React, { Component } from 'react';
import DeleteItem from './DeleteItem';


class Survey extends Component {


    render() {
        let { data } = this.props;
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />
                Survey
            </div>

        );
    }

}

export default Survey;