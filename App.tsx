import React, { useState } from 'react';
import BottomComponent from './components/BottomComponent';
import TopComponent from './components/TopComponent';
import FinnishTopComponent from './components/FinnishTopComponent';
import FinnishBottomComponent from './components/FinnishBottomComponent';
import { Provider } from 'react-native-paper';

const App : React.FC = () : React.ReactElement => {
  const [language, setLanguage] = useState<string>("english");

  return (
    <Provider>
      {
        (language === 'english')
        ?
        <>
          <TopComponent setLanguage={setLanguage}/>
          <BottomComponent/>
        </>
        : 
        <>
          <FinnishTopComponent setLanguage={setLanguage}/>
          <FinnishBottomComponent/>
        </>
      }
    </Provider>
  );
}

export default App;