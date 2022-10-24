import React, { useState, useEffect } from 'react';
import { Button, Text, IconButton } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface SongProps {
    song? : string;
}

interface Song {
    id : number,
    songName : string,
    songLyrics : string
    date : string | Date
  }

const FinnishSongs : React.FC<SongProps> = (props : any) : React.ReactElement => {
    const [songDetails, setSongDetails] = useState<boolean>(false);
    const [songsExist, setSongsExist] = useState<boolean>(false);
    const [details, setDetails] = useState<any>();
    const [songList, setSongList] = useState<any>([{
        id: 0,
        songName: "Example Song",
        songLyrics: "Lyrics",
        date: "today"
    }]);

    useEffect(() => {
    }, [songList]);

    const test = async () => {
        let filename = "songs.json"
        let fileUri: string = `${FileSystem.documentDirectory}${filename}`;
        let json : string = await FileSystem.readAsStringAsync(fileUri);
        let parsedJson = JSON.parse(json);
        console.log(parsedJson); 
        setSongList(parsedJson);
        setSongsExist(true);
    }

    const showSong = (id : number) => {
        let text : string = songList[id].songLyrics;
        let date : string = songList[id].date;
        setSongDetails(true);
        setDetails(text + " " + date)
    }

    const deleteAll = async () => {
        let empty = [{
            id: 0,
            songName: "Example Song",
            songLyrics: "Lyrics",
            date: "today"
        }];
        let empty2 = JSON.stringify(empty);
        let filename = "songs.json"
        let fileUri: string = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.writeAsStringAsync(fileUri, empty2);
        let json : string = await FileSystem.readAsStringAsync(fileUri);
        let parsedJson = JSON.parse(json);
        setSongList(parsedJson)
        console.log(await FileSystem.readAsStringAsync(fileUri))
    }

  return (
    <>
        <View style={dark.wrapper}>
            <Button
                onPress={() => test()}
            >Tallennetut riimit</Button>
            <View style={styles.container}>
                {
                    (songsExist)
                    ? 
                        <>
                            <View>
                                <ScrollView>
                                    <View style={dark.container}>
                                        {songList.map((element : any, idx : number) => {
                                            return (
                                                    <View style={dark.buttonContainer} key={element.id}>
                                                        <Button
                                                            labelStyle={{color: 'white'}}
                                                            style={dark.button}
                                                            key={element.id}
                                                            mode='outlined'
                                                            onPress={() => showSong(element.id)}
                                                        >{element.songName}</Button>
                                                        <IconButton icon='delete' iconColor='#21a651'></IconButton>
                                                    </View>
                                                    )
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                        </>
                    : null 
                }

                {
                    (songDetails)
                    ?
                    <>  
                        <View style={styles.container}>
                            <Text style={{ flexShrink: 1 }}>{details}</Text>
                        </View>
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
        width: '100%'
    },
    button: {
        borderRadius: 0,
        marginBottom: 7,
        backgroundColor: '#2f3d4c',
        borderWidth: 0,
        width: '85%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%'
    }
});

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: 'column',
    }
});


export default FinnishSongs;