import React, { Component } from 'react';
import Display from './Display';
import Cation from './Cation';
import Drow from './Drow';
import Jigsaw from './Jigsaw';
import Read from './Read';
import Survey from './Survey';
import Choice from './Choice';
// import demodata from './demodata';



class DataArr extends Component {

    componentWillMount() {
    }

    render() {
       
        let data = this.props.data['courseware']
        return (
            <div >
                {data.map((item, index) => {
                    switch (item['type']) {
                        case 'display':
                            return <Display data={item} key={index} />
                        case 'cation':
                            return <Cation data={item} key={index} />
                        case 'drow':
                            return <Drow data={item} key={index} />
                        case 'jigsaw':
                            return <Jigsaw data={item} key={index} />
                        case 'read':
                            return <Read data={item} key={index} />
                        case 'survey':
                            return <Survey data={item} key={index} />
                        case 'choice':
                            return <Choice data={item} key={index} />
                        default:
                            return '';
                    }
                })}
            </div>

        );
    }

}

export default DataArr;