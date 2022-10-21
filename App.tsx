import React from 'react';
import BottomComponent from './components/BottomComponent';
import TopComponent from './components/TopComponent';
import {Provider} from 'react-native-paper';

const App : React.FC = () : React.ReactElement => {

  return (
    <Provider>
      <TopComponent/>
      <BottomComponent/>
    </Provider>
  );
}


export default App;