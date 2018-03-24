import React, { Component } from 'react';
import Display from './Display';
import Cation from './Cation';
import Drow from './Drow';
import Jigsaw from './Jigsaw';
import Read from './Read';
import Survey from './Survey';
import Choice from './Choice';
import demodata from './demodata';



class DataArr extends Component {

    componentWillMount() {
    }

    render() {
        let data = demodata ? demodata : [];
        return (
            <div >
                {data.map((item, index) => {
                    switch (item['type']) {
                        case 'display':
                            return <Display key={index} />
                        case 'cation':
                            return <Cation key={index} />
                        case 'drow':
                            return <Drow key={index} />
                        case 'jigsaw':
                            return <Jigsaw key={index} />
                        case 'read':
                            return <Read key={index} />
                        case 'survey':
                            return <Survey key={index} />
                        case 'choice':
                            return <Choice key={index} />
                        default:
                            return '';
                    }
                })}
            </div>

        );
    }

}

export default DataArr;