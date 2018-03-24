import React, { Component } from 'react';
import Display from './Display';
import Cation from './Cation';
import Drow from './Drow';
import Jigsaw from './Jigsaw';
import Read from './Read';
import Survey from './Survey';



class DataArr extends Component {
    
    componentWillMount(){
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