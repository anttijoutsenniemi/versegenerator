import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import wordlist from '../words.json';

interface Buttons {
    id : number,
    name : string
}

const Content : React.FC = () : React.ReactElement => {
    const [verse, setVerse] = useState<string>("");
    const [matches, setMatches] = useState<any>([]);
    const [error, setError] = useState<string>("");
    const [buttons, setButtons] = useState<Buttons>();
    const [buttonsExist, setButtonsExist] = useState<boolean>(false);

    useEffect(() => {
        if(verse.endsWith(" ")){
            if(verse.endsWith("  ")){
                console.log("useampi väli")
            } else {
                createButton();
            }
        }
    }, [verse]);

    const createButton = () => {
        let verseArray = verse.trim().split(" ");
        let lastWord = verseArray[verseArray.length - 1];
        setButtons({
            ...buttons,
            id :
        });
        console.log(buttons);
        setButtonsExist(true);
    }

    const avaa = () => {
        let startingNumber : number = Math.floor(Math.random() * 1000) + 1;
        let increment : number = Math.floor(Math.random() * 5) + 1;
        let end : string = verse[verse.length - 2] + verse[verse.length - 1];
        let matchCount : number = 0;
        let secondCount : number = 0;
        let thirdCount : number = 0;
        let results = [];
        for(let i = startingNumber; i < wordlist.words.length; i = i + increment){
            secondCount++;
            if(wordlist.words[i].endsWith(end)){
                results.push(wordlist.words[i]);
                matchCount++
            }
            if(matchCount >= 20){
                break;
            }
            if(secondCount >= 10000){
                break;
            }
        }
        if(matchCount < 10){
            for(let i = 0; i < wordlist.words.length; i++){
                thirdCount++;
                if(wordlist.words[i].endsWith(end)){
                    results.push(wordlist.words[i]);
                    matchCount++
                }
                if(matchCount >= 20){
                    break;
                }
                if(thirdCount >= 10000){
                    setError("No word matches");
                    console.log("no word matches")
                    break;
                }
            } 
        }
        console.log(results);
        setMatches(results);
    }

  return (
    <>
        <View style={styles.container}>
            <Button
                onPress={() => avaa()}
            >Avaa</Button>

            {
                (buttonsExist)
                ? buttons.forEach((button : any)=> {
                    <Button>{button}</Button>
                })
                : null
            }

            <Text style={styles.text}>{verse}</Text>
            <TextInput
                mode='outlined'
                label="Start versing..."
                value={verse}
                onChangeText={verse => setVerse(verse)}
            >
            </TextInput>
        </View>
    </>
  );

  
}
const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    text: {
        paddingBottom: 20,
        paddingTop: 20
    },
});


export default Content;