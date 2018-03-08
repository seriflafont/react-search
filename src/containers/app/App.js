import React, { Component } from 'react';
//import logo from '../../images/logo.svg';
import './App.css';
import SearchPage from '../../containers/SearchPage/SearchPage'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Referrals Wanted Admin</h1>
        </header>
        <SearchPage />
      </div>
    );
  }
}

export default App;
