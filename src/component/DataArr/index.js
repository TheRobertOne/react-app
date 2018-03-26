import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Display from './Display';
import Cation from './Cation';
import Drow from './Drow';
import Jigsaw from './Jigsaw';
import Read from './Read';
import Survey from './Survey';
import Choice from './Choice';
import Multiselect from './Multiselect';
// import demodata from './demodata';



class DataArr extends Component {

    componentWillMount() {
    }

    render() {
        // let data = state['header'].get('initData').toJS();
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
                        case 'multiselect':
                            return <Multiselect data={item} key={index} />
                        default:
                            return <div>id:{item['id']}</div>;
                    }
                })}
            </div>

        );
    }

}


function mapStateToProps(state, ) {
    let data = state['header'].get('initData').toJS();
    return {
        data
    };
}

function mapDispatchToProps(dispatch) {
    let method = {
    };
    let boundActionCreators = bindActionCreators(method, dispatch);
    return {
        dispatch,
        ...boundActionCreators
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(DataArr);