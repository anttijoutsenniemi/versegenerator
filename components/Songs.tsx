import React, { useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface SongProps {
    song? : string;
}

const Songs : React.FC<SongProps> = (props : any) : React.ReactElement => {

    const [songsExist, setSongsExist] = useState<boolean>(false);

    const test = (song : any) => {
        console.log(song);
    }

  return (
    <>
        <Button
            onPress={() => test(props.song)}
        >Test</Button>
    </>
  );

  
}
const styles = StyleSheet.create({
    
});


export default Songs;