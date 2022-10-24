import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import FinnishContent  from './FinnishContent';
import FinnishSongs from './FinnishSongs';
import * as FileSystem from 'expo-file-system';

interface Song {
  id : number,
  songName : string,
  songLyrics : string
  date : string | Date
}

const FinnishBottomComponent : React.FC = () : React.ReactElement => {       

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
        date: "today"
    }];
      let empty2 = JSON.stringify(empty);
      await FileSystem.writeAsStringAsync(fileUri, empty2)
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
    let stringedJson = JSON.stringify(parsedJson);
    await FileSystem.writeAsStringAsync(fileUri, stringedJson);
    console.log("lisätty");
    let json2 : string = await FileSystem.readAsStringAsync(fileUri);
    let parsedJson2 = JSON.parse(json2);
    console.log(parsedJson2);
  }

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'versing', title: 'Versing', focusedIcon: 'pencil' },
    { key: 'songs', title: 'Saved Songs', focusedIcon: 'music-note' }
  ]);

  const VersingRoute = () => <FinnishContent saveSong={saveSong} />;

  const SongsRoute = () => <FinnishSongs/>;

  /*const renderLabel = ({ route, focused, color }) => {
    switch (route.key) {
      case 'versing':
        return <Text>Versing</Text>;
      case 'songs':
        return <Text>Saved Songs</Text>;
    }
  }*/

  const renderScene = BottomNavigation.SceneMap({
    versing: VersingRoute,
    songs: SongsRoute
  });

  return (
    <>
    <Text style={dark.label}>Riimittely</Text>
    <Text style={dark.label2}>Tallennetut riimit</Text>
    <BottomNavigation
      labeled={false}
      style={dark.container}
      barStyle={{ backgroundColor: '#2f3d4c',paddingBottom: 10 }}
      activeColor='#21a651'
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
    color: '#adb1ba',
  },
  label : {
    color: 'white',
    position: 'absolute',
    top: 775,
    left: 70,
    zIndex: 1,
  },
  label2 : {
    color: 'white',
    position: 'absolute',
    top: 775,
    right: 45,
    zIndex: 1
  },
});

export default FinnishBottomComponent;