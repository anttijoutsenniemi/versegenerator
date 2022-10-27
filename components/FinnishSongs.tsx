import React, { useState, useEffect } from 'react';
import { Button, Text, IconButton, Portal, Dialog } from 'react-native-paper';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';

interface SongsProps {
    songsExist : any,
    editVerse: any,
}

interface Details {
    id : number,
    songName: string,
    lyrics: string,
    date: string
}

const FinnishSongs : React.FC<SongsProps> = (props) : React.ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [songDetailsExist, setSongDetailsExist] = useState<boolean>(false);
    const [songsExistForListing, setSongsExistForListing] = useState<boolean>(false);
    const [details, setDetails] = useState<Details>({
        id : 0,
        songName: "Example Song",
        lyrics: "Lyrics",
        date: "test"
    });
    const [songList, setSongList] = useState<any>([{
        id: 0,
        songName: "Example Song",
        songLyrics: "Lyrics",
        date: "test"
    }]);

    useEffect(() => {
        updateSongs();
    }, [props.songsExist]);

    const updateSongs = async () => {
        let filename = "songs.json"
        let fileUri: string = `${FileSystem.documentDirectory}${filename}`;
        let json : string = await FileSystem.readAsStringAsync(fileUri);
        let parsedJson = JSON.parse(json);
        setSongList(parsedJson);
        setSongsExistForListing(true);
    }

    const showSong = (id : number) => {
        let text : string = songList[id].songLyrics;
        let date : string = songList[id].date;
        let name : string = songList[id].songName;
        setSongDetailsExist(true);
        setDetails({
            id: id,
            songName: name,
            lyrics: text,
            date: date
        })
        showDialog();
    }

    const deleteSong = async (id : number) => {
        let filename = "songs.json"
        let fileUri: string = `${FileSystem.documentDirectory}${filename}`;
        let json : string = await FileSystem.readAsStringAsync(fileUri);
        let parsedJson = JSON.parse(json);
        let newJson = parsedJson.filter((item : any) => item.id !== id);
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newJson));
        setSongList(newJson);
    }

    const editVerseSongs = async (id : number, name : string, lyrics : string) => {
        hideDialog();
        props.editVerse(id, name, lyrics);
        editAlert();
    }

    const copyToClipboard = async (text : string) => {
        await Clipboard.setStringAsync(text);
        copyAlert();
    };

    const editAlert = () =>
    Alert.alert(
      "Riimit on nyt muokattavissa riimittelysivulla!",
      " ",
      [
        {
          text: "Ok",
          style: "default"
        }
      ]
    );

    const copyAlert = () =>
    Alert.alert(
      "Sisältö kopioitu leikepöydälle!",
      " ",
      [
        {
          text: "Ok",
          style: "default"
        }
      ]
    );

    const deleteVerseAlert = (id : number) =>
    Alert.alert(
      "Oletko varma että haluat poistaa riimit?",
      " ",
      [
        {
          text: "Kumoa",
          style: "cancel"
        },
        { text: "Poista riimit", onPress: () => deleteSong(id) }
      ]
    );

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

  return (
    <>
        <View style={dark.wrapper}>
            <View style={styles.container}>
                {
                    (songsExistForListing)
                    ? 
                        <>
                            <View>
                                <ScrollView>
                                    <View style={dark.container}>
                                        {songList.map((element : any) => {
                                            return (
                                                    (element.date !== "test")
                                                    ?
                                                    <View style={dark.buttonContainer} key={element.id}>
                                                        <Button
                                                            labelStyle={{color: 'white'}}
                                                            style={dark.button}
                                                            key={element.id}
                                                            onPress={() => showSong(element.id)}
                                                        >{element.songName}</Button>
                                                        <IconButton 
                                                            icon='delete' 
                                                            iconColor='#21a651'
                                                            onPress={() => deleteVerseAlert(element.id)}
                                                        ></IconButton>
                                                    </View>
                                                    : null
                                                    )
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                        </>
                    : null 
                }

                {
                    (songDetailsExist)
                    ?
                    <>  
        <Portal>
            <Dialog style={dark.dialogWrapper} visible={visible} dismissable onDismiss={hideDialog}>
                <View style={dark.dialog}>
                    <Dialog.Title style={{color: 'white'}}>{details.songName}</Dialog.Title>
                        <ScrollView>
                            <Dialog.Content>
                                <Text style={dark.text}>{details.date}</Text>
                                <Text style={dark.text}>{details.lyrics}</Text>
                            </Dialog.Content>
                        </ScrollView>
                    <Dialog.Actions>
                        <Button labelStyle={{ color: 'white' }} onPress={() => hideDialog()}>Sulje</Button>
                        <Button labelStyle={{ color: 'white' }} onPress={() => copyToClipboard(details.lyrics)}>Kopioi sisältö</Button>
                        <Button mode='outlined' labelStyle={{ color: '#21a651' }} onPress={() => editVerseSongs(details.id, details.songName, details.lyrics)}>Muokkaa riimejä</Button>
                    </Dialog.Actions>
                </View>
            </Dialog>
        </Portal>
                    </>
                    : null
                }
            </View>
        </View>
    </>
  );

  
}
const dark = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: '#263340'
    },
    container: {
        margin: 5,
        flexDirection: 'column',
        width: '100%',
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#2f3d4c',
        borderWidth: 0,
        width: '85%',
        height: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        marginTop: 5,
    },
    dialog: {
        flexDirection: 'column',
    },
    dialogWrapper: {
        backgroundColor: '#2f3d4c',
    },
    text: {
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10
      },
});

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: 'column',
    }
});


export default FinnishSongs;