import React, { Component } from 'react';
import dataType from './datatype';
import Display from './Display';
import Cation from './Cation';
import Drow from './Drow';
import Jigsaw from './Jigsaw';
import Read from './Read';
import Survey from './Survey';



class DataArr extends Component {
    constructor() {
        super();
    }
    componentWillMount(){
        console.log(dataType);
    }
    render() {
        return (
            <div >
                <Read />
                <Display />
                <Cation />
                <Drow />
                <Jigsaw />
                <Survey />
            </div>

        );
    }

}

export default DataArr;