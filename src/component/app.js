import React, { Component } from 'react';
class App extends Component {
   
    render() {
        return (
            <div onClick={()=>{
                console.log("clickk")
            }}>
                hello app
            </div>
        );
    }
}

export default App;