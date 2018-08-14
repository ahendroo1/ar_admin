import React, { Component } from 'react';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Route } from 'react-router-dom';
import Barang from './components/Barang';
import Login from './components/Login';
import Header from './components/Header';
import logo from './logo-TA.png';
import Order from './components/Order';

class App extends Component {

  constructor(){
    super()
  }

  render() {
    return (
      <div>
          <Route exact path="/" component={Login} />
          <Route path="/barang" component={Barang} />
          <Route path="/order" component={Order} />
      </div>
    );
  }
} 

export default App;