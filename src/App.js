import React, { Component } from 'react';
import logo from './logo.svg';
import MapContainer from './containers/MapContainer';

// CSS
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>
        <div className="container h-100">
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default App;
