import React, { Component } from 'react';
import DeleteItem from './DeleteItem';


class Drow extends Component {

    render() {
        let { data } = this.props;
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />
                drow
            </div>

        );
    }

}

export default Drow;