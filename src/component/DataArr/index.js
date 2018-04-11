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
import NewDraw from './NewDraw';



class DataArr extends Component {
    constructor() {
        super();

    }

    componentWillMount() {
    }


    render() {
        // let data = state['header'].get('initData').toJS();
        let data = this.props.data['courseware']
        let gotoId = this.props.gotoId;
        let temArr = [];

        if (gotoId) {
            let len = data.length;

            for (let i = 0; i < len; i++) {
                if (data[i]['id'] === gotoId) {
                    temArr.push(data[i]);

                    break;
                }
            }
            data = temArr;
        }
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
                        case 'newdraw':
                            return <NewDraw data={item} key={index} />
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
    let gotoId = state['header'].get('gotoId');
    return {
        data,
        gotoId
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