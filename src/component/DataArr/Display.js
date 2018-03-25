import React, { Component } from 'react';
import DeleteItem from './DeleteItem';


class Display extends Component {


    render() {

        let { data } = this.props;
        console.log(data);
        return (
            <div className="topic-item-box">
                <DeleteItem item={data} />

                Display
            </div>

        );
    }

}

export default Display;