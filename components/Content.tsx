import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Text, Button, TextInput } from 'react-native-paper';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import wordlist from '../words.json';
import Songs from './Songs';

interface ContentProps {
    buttons : string[];
    setButtons : Dispatch<SetStateAction<string[]>>
}

const Content : React.FC<ContentProps> = (props) : React.ReactElement => {
    const [verse, setVerse] = useState<string>("");
    const [matches, setMatches] = useState<any>([]);
    const [error, setError] = useState<string>("");
    const [matchesExist, setMatchesExist] = useState<boolean>(false);

    useEffect(() => {
        if(verse.endsWith(" ")){
            createButton();
        }
    }, [verse]);

    const createButton = () => {
        let verseArray = verse.trim().split(" ");
        let lastWord = verseArray[verseArray.length - 1];
        props.setButtons([...props.buttons, lastWord]);
        setVerse("");
    }

    const putMatchInVerse = (match : string) => {
        props.setButtons([...props.buttons, match]);
    }

    const deleteWord = (index : number) => {
        let oldButtons = props.buttons;
        let newButtons = oldButtons.filter((item : any, itemIndex : number) => itemIndex !== index);
        props.setButtons(newButtons);
    }

    const saveSong = () => {
        
    }

    const findMatch = (word : string) => {
        let startingNumber : number = Math.floor(Math.random() * 1000) + 1;
        let increment : number = Math.floor(Math.random() * 5) + 1;
        let end3 : string = word[word.length - 3] + word[word.length - 2] + word[word.length - 1];
        let end2 :  string = word[word.length - 2] + word[word.length - 1];
        let matchCount : number = 0;
        let loopCount : number = 0;
        let secondLoopCount : number = 0;
        let results = [];
        for(let i = startingNumber; i < wordlist.words.length; i = i + increment){
            loopCount++;
            if(wordlist.words[i].endsWith(end3)){
                results.push(wordlist.words[i]);
                matchCount++
            }
            if(matchCount >= 20){
                break;
            }
            if(loopCount >= 10000){
                break;
            }
        }
        if(matchCount < 2){
            for(let i = 0; i < wordlist.words.length; i++){
                secondLoopCount++;
                if(wordlist.words[i].endsWith(end2)){
                    results.push(wordlist.words[i]);
                    matchCount++
                }
                if(matchCount >= 20){
                    break;
                }
                if(secondLoopCount >= 10000){
                    setError("No word matches");
                    console.log("no word matches")
                    break;
                }
            } 
        }
        setMatches(results);
        setMatchesExist(true);
    }

  return (
    <>
    <Button onPress={()=> saveSong()}>Save song</Button>
        <View style={styles.container}>
            {
                (props.buttons[1])
                ? 
                    <>
                        <View style={styles.wordWrapper}>
                            <ScrollView>
                                <View style={styles.wordContainer}>
                                    {props.buttons.map((word : any, idx : number) => {
                                        return <Button
                                                    style={styles.wordButton}
                                                    key={idx}
                                                    mode='outlined'
                                                    onPress={() => findMatch(word)}
                                                    onLongPress={() => deleteWord(idx)}
                                                >{word}</Button>
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                        
                        {(matchesExist)
                        ? 
                            <>
                                <Text style={styles.text}>Suggestions</Text>
                                <View style={styles.suggestionContainer} >
                                    <ScrollView horizontal>

                                            {matches.map((match : any, idx : number) => {
                                                    return <Button
                                                                style={styles.suggestionButton}
                                                                key={idx}
                                                                mode='outlined'
                                                                onPress={() => putMatchInVerse(match)}
                                                            >{match}</Button>
                                                })}
                                    
                                    </ScrollView>
                                </View >
                            </>
                        : null
                        }
                    </>
                : null
            }



            <TextInput
                style={styles.input}
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
        margin: 10,
        flexWrap: 'wrap'
    },
    input: {
        marginBottom: 20,
        marginTop: 20,
        position: 'absolute',
        width: '100%',
        top: 350
    },
    wordWrapper: {
        width: '100%',
        height: 270,
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    wordButton: {
        margin: 1,
        borderRadius: 5,
    },
    suggestionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    suggestionButton: {
        margin: 1,
        borderRadius: 5,
        backgroundColor: 'rgb(243, 238, 245)'
    },
    text: {
       paddingBottom: 5,
       paddingTop: 5
    }
});


export default Content;