import React, { useState } from 'react';
import { Appbar, IconButton, Portal, Dialog, Button, Text, RadioButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

interface TopComponentProps {
  setLanguage: any;
}

const TopComponent : React.FC<TopComponentProps> = (props) : React.ReactElement => {
  const [visible, setVisible] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('english');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const setSettings = () => {
    hideDialog();
    props.setLanguage(language);
  }

  return (
    <>
        <Appbar.Header style={dark.appbarHeader}>
            <Appbar.Content title="Verse Generator" titleStyle={{ color: 'white'}}/>
            <View><IconButton onPress={()=> showDialog()} icon="cog-outline" iconColor='#21a651' size={30}/></View>
        </Appbar.Header>
        <Portal>
            <Dialog style={dark.dialogWrapper} visible={visible} dismissable onDismiss={hideDialog}>
                <View style={dark.dialog}>
                    <Dialog.Title style={{color: 'white'}}>Settings</Dialog.Title>
                        <Dialog.Content>
                        <Text style={dark.text}>Language</Text>
                        <View style={dark.radioContainer}>
                          <Text style={dark.text}>Suomi </Text>
                          <RadioButton
                            color='#21a651'
                            value="suomi"
                            status={ language === 'suomi' ? 'checked' : 'unchecked' }
                            onPress={() => setLanguage('suomi')}
                          />
                          </View>
                          <View style={dark.radioContainer}>
                            <Text style={dark.text}>English</Text>
                          <RadioButton
                            color='#21a651'
                            value="english"
                            status={ language === 'english' ? 'checked' : 'unchecked' }
                            onPress={() => setLanguage('english')}
                          />
                          </View>
                          <View style={dark.infoContainer}>
                          <Text style={dark.infoLabel}>Info</Text>
                            <Text style={dark.infoText}>
                              When you press a word once, perfect matches are first sought up and in a descending order.
                              On second press longer matches are searched as the algorithm goes through the database
                              starting from other end. On third press matches are fully random.
                            </Text>
                          </View>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button style={dark.wordButton} labelStyle={{ color: 'white' }} onPress={() => hideDialog()}>Close</Button>
                        <Button style={dark.doneButton} mode='outlined' labelStyle={{ color: '#21a651' }} onPress={() => setSettings()}>Done</Button>
                    </Dialog.Actions>
                </View>
            </Dialog>
        </Portal>
    </>
  );

  
}
const dark = StyleSheet.create({
    infoContainer: {
      padding: 10
    },
    infoText: {
      color: 'white',
    },
    infoLabel : {
      color: 'white',
      paddingBottom: 20,
      paddingTop: 20
    },
    appbarHeader: {
        backgroundColor: '#2f3d4c',
        color: '#adb1ba',
        flexDirection: 'row'
    },
    wordButton: {
      margin: 1,
      borderRadius: 5,
      backgroundColor: '#1d2833',
      color: '#adb1ba',
      borderColor: '#adb1ba',
    },
    dialog: {
      flexDirection: 'column',
    },
    dialogWrapper: {
      backgroundColor: '#2f3d4c',
    },
    doneButton: {
      backgroundColor: '#21a651',
      borderWidth: 0,
      margin: 1,
      borderRadius: 5,
    },
    radioContainer: {
      flexDirection: 'row',
      padding: 5,
      paddingTop: 20
    },
    text: {
      color: 'white',
      paddingTop: 7,
      paddingRight: 20
    },
    radio: {
      color: '#21a651'
    }
});

const styles = StyleSheet.create({
  appbarHeader: {
      backgroundColor: '#2f3d4c',
      color: '#adb1ba',
      flexDirection: 'row'
  },
  dialog: {
    height: 200,
    flexDirection: 'column',
  },
  dialogWrapper: {
    backgroundColor: '#2f3d4c',
  }
});


export default TopComponent;