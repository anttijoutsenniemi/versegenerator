import React from 'react';
import { Appbar, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const TopComponent : React.FC = () : React.ReactElement => {

  return (
    <>
        <Appbar.Header style={dark.appbarHeader}>
            <Appbar.Content title="Verse Generator" titleStyle={{ color: '#adb1ba'}}/>
            <View style={dark.iconContainer}><IconButton icon="menu-open" iconColor='#21a651' size={35}/></View>
        </Appbar.Header>
    </>
  );

  
}
const dark = StyleSheet.create({
    appbarHeader: {
        backgroundColor: '#2f3d4c',
        color: '#adb1ba',
        flexDirection: 'row'
    },
    iconContainer: {
      
    }
});


export default TopComponent;