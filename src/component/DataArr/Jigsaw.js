import React, { Component } from 'react';
import DeleteItem from './DeleteItem';


class Jigsaw extends Component {


    render() {
        let { data } = this.props;
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />
                Jigsaw
            </div>

        );
    }

}

export default Jigsaw;