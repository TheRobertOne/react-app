import React, { Component } from 'react';

import DeleteItem from './DeleteItem';

class Read extends Component {


    render() {
        let { data } = this.props;
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />
                Read
            </div>

        );
    }

}

export default Read;