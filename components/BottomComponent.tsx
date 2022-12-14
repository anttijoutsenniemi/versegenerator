import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Content  from './Content';
import Songs from './Songs';
import * as FileSystem from 'expo-file-system';

interface Song {
  id : number,
  songName : string,
  songLyrics : string
  date : string | Date
}

const BottomComponent : React.FC = () : React.ReactElement => {
  const [songsExist, setSongsExist] = useState<boolean>(false);
  const [editButtons, setEditButtons] = useState<string[]>([]);

  const formatDate = (date : Date) => {
    let day : number | string = date.getDate();
    let month : number | string = (date.getMonth() + 1);
        if(day < 10){
            day = '0' + day;
        }
        if(month < 10){
            month = '0' + month;
        } 
    let formattedDay = day + "." + month + "." + date.getFullYear();
    return formattedDay;
}

  const saveSong = async (songName : string, buttons : string[]) => {
    //create file path and today
    let filename = "songs.json"
    let fileUri: string = `${FileSystem.documentDirectory}${filename}`;
    let today = new Date();

    //create file if it does not exist
    if((await FileSystem.getInfoAsync(fileUri)).exists === false){
      let empty = [{
        id: 0,
        songName: "Example Song",
        songLyrics: "Lyrics",
        date: "test"
    }];
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(empty));
    }

    //create lyrics
    let newSongLyrics : string = "";
    buttons.forEach(value => {
      newSongLyrics = newSongLyrics + " " + value;
    });

    //read json and parse it
    let json : string = await FileSystem.readAsStringAsync(fileUri);
    let parsedJson = JSON.parse(json);

    //make array if not already
    if(json[0] !== "["){
      let array = [];
      array.push(parsedJson);
      parsedJson = array;
    }

    //add new song to file
    let newSong : Song;
    newSong = {
        id: parsedJson[parsedJson.length - 1].id + 1,
        songName: songName,
        songLyrics: newSongLyrics,
        date: formatDate(today)
    }
    parsedJson.push(newSong);
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(parsedJson));
    setSongsExist(true);
  }

  const editVerse = async (id : number, name : string, lyrics : string) => {
    let buttons = lyrics.trim().split(" ");
    setEditButtons(buttons);
  }

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'versing', title: 'Versing', focusedIcon: 'pencil' },
    { key: 'songs', title: 'Saved Songs', focusedIcon: 'music-note' }
  ]);

  const VersingRoute = () => <Content saveSong={saveSong} editButtons={editButtons}/>

  const SongsRoute = () => <Songs songsExist={songsExist} editVerse={editVerse}/> 

  const renderScene = BottomNavigation.SceneMap({
    versing: VersingRoute,
    songs: SongsRoute
  });

  return (
    <>
    <BottomNavigation
      labeled={false}
      style={dark.container}
      barStyle={{ backgroundColor: '#2f3d4c' }}
      activeColor='white'
      inactiveColor='#21a651'
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    </>
  );

};

const dark = StyleSheet.create({
  container : {
    backgroundColor: '#2f3d4c',
  },
  labelWrapper : {
    backgroundColor: '#2f3d4c',
    flexDirection: 'row'
  },
  labelContainer : {
    width: '50%',
    backgroundColor: '#2f3d4c',
    textAlign: 'center',
    paddingBottom: 10,
    
  },
  label : {
    color: 'white',
    textAlign: 'center'
  }
});

export default BottomComponent;