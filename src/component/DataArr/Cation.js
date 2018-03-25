import React, { Component } from 'react';
import DeleteItem from './DeleteItem';


class Cation extends Component {


    render() {
        let { data } = this.props;
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />
                Cation
            </div>

        );
    }

}

export default Cation;