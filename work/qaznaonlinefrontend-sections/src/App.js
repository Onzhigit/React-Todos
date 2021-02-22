import React from 'react';

import Header from './components/Header';
import Main from './Main';
import AlertComponent from './components/Alert'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux
import {Provider} from 'react-redux';
import store from './store'



const App = () => {

  return (
    <Provider store={store}>
      <Header />
      <AlertComponent/>
      <Main /> 
       
    </Provider>
  );
};

export default App;
