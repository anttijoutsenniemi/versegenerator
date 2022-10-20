import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Content  from './Content';
import Songs from './Songs';
import songs from './../songs'

interface Song {
  songName : string,
  lyrics : any
}

interface Songs {
  id : number,
  song : Song
}

const BottomComponent : React.FC = () : React.ReactElement => {                                        
  const saveSong = (buttons : string[]) => {
    let newSongLyrics : string;
    buttons.forEach(value => {
      newSongLyrics = newSongLyrics + " " + value
    });
    //let testi = songs.lisaa("eka", newSongLyrics);
    //console.log(testi);
    console.log(songs.haeKaikki);
  }

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'versing', title: 'Versing', focusedIcon: 'pencil' },
    { key: 'songs', title: 'Saved Songs', focusedIcon: 'music-note' }
  ]);

  const VersingRoute = () => <Content saveSong={saveSong} />;

  const SongsRoute = () => <Songs/>;

  const renderScene = BottomNavigation.SceneMap({
    versing: VersingRoute,
    songs: SongsRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomComponent;