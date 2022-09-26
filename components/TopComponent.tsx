import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';


const App : React.FC = () : React.ReactElement => {


  return (
    <>
        <Appbar.Header style={styles.appbarHeader}>
            <Appbar.Content title="VerseGen"/>
        </Appbar.Header>
    </>
  );

  
}
const styles = StyleSheet.create({
    appbarHeader: {
        backgroundColor: 'rgb(243, 238, 245)'
    }
});


export default App;