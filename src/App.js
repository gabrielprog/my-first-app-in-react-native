import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import './config/ReactOtron';

import Router from './routes';

function App() {
  return (
    <>
      <StatusBar 
        barStyle='light-content'
        showHideTransition='fade'
        backgroundColor='#7159c1'
      />
      <Router />
    </>
  );
};

export default App;
