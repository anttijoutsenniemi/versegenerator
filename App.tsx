import React from 'react';
import BottomComponent from './components/BottomComponent';
import TopComponent from './components/TopComponent';

const App : React.FC = () : React.ReactElement => {

  return (
    <>
      <TopComponent/>
      <BottomComponent/>
    </>
  );
}


export default App;