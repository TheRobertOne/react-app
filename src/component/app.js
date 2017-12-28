import React, { Component } from 'react';
import AppChild from './app-child';
class App extends Component {

    render() {

        return (
            <div >
            开心就好
                <AppChild />
            </div>
        );
    }
}

export default App;

