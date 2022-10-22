import React, { useState, useEffect } from 'react';
import { Button, Text } from 'react-native-paper';
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

const Songs : React.FC<SongProps> = (props : any) : React.ReactElement => {
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
        <Button
            onPress={() => test()}
        >Saved songs</Button>
        <Button
            mode='outlined'
            onPress={() => deleteAll()}
            style={{backgroundColor: 'red'}}
        >Delete songs</Button>
        <View style={styles.container}>
            {
                (songsExist)
                ? 
                    <>
                        <View>
                            <ScrollView>
                                <View style={styles.container}>
                                    {songList.map((element : any, idx : number) => {
                                        return <Button
                                                    style={styles.button}
                                                    key={element.id}
                                                    mode='outlined'
                                                    onPress={() => showSong(element.id)}
                                                >{element.songName}</Button>
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
    </>
  );

  
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'column',
    },
    button: {
        margin: 5
    }
});


export default Songs;