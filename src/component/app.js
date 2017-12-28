import React, { Component } from 'react';
import AppChild from './app-child';
class App extends Component {

    render() {

        return (
            <div >
                <div>这里是app 入口</div>
                <AppChild />
            </div>
        );
    }
}

export default App;

