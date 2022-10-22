import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Text, Button, Dialog, Portal, Provider} from 'react-native-paper';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import wordlist from '../words.json';
import Songs from './Songs';

/*interface ContentProps {
    buttons : string[];
    setButtons : Dispatch<SetStateAction<string[]>>
    saveSong : any;
}*/

interface ContentProps {
    saveSong: any;
}

const Content : React.FC<ContentProps> = (props) : React.ReactElement => {
    const [verse, setVerse] = useState<string>("");
    const [matches, setMatches] = useState<any>([]);
    const [error, setError] = useState<string>("");
    const [matchesExist, setMatchesExist] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [buttons, setButtons] = useState<string[]>([]);
    const [buttonsExist, setButtonsExist] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [songName, setSongName] = useState<string>("");
    const [visible, setVisible] = React.useState<boolean>(false);
    const [darkmode, setDarkmode] = React.useState<boolean>(true);
    
    useEffect(() => {
        if(verse.endsWith(" ")){
            createButton();
        }
    }, [verse]);

    const createButton = () => {
        //setCounter(counter + 1);
        let verseArray = verse.trim().split(" ");
        let lastWord = verseArray[verseArray.length - 1];
        setButtons([...buttons, lastWord]);
        setVerse("");
        /*if(counter === 0){
            deleteWord(0);
        }*/
        setButtonsExist(true);
    }

    const putMatchInVerse = (match : string) => {
        setButtons([...buttons, match]);
    }

    const deleteWord = (index : number) => {
        let oldButtons = buttons;
        let newButtons = oldButtons.filter((item : any, itemIndex : number) => itemIndex !== index);
        setButtons(newButtons);
    }

    const saveSong = () => {
        showDialog();
    }

    const sendSong = () => {
        props.saveSong(songName, buttons);
        hideDialog();
    }

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

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
        if(matchCount < 10){
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
        <View style={(darkmode) ? dark.container1 : styles.container }>
            <View style={(darkmode) ? dark.container : styles.container }>
        <Portal>
            <Dialog visible={visible} dismissable onDismiss={hideDialog}>
                <View style={styles.dialog}>
                    <Dialog.Title>Name for your song</Dialog.Title>
                        <Dialog.Content>
                        <TextInput
                            autoFocus
                            style={styles.songInput}
                            value={songName}
                            onChangeText={songName => setSongName(songName)}
                        ></TextInput>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={() => hideDialog()}>Close</Button>
                        <Button mode='outlined' onPress={() => sendSong()}>Done</Button>
                    </Dialog.Actions>
                </View>
            </Dialog>
        </Portal>
            {
                (buttonsExist)
                ? 
                    <>  
                        <View style={styles.saveSongContainer}>
                        <Button onPress={()=> saveSong()} style={(darkmode) ? dark.saveSong : styles.saveSong } labelStyle={{ color: '#adb1ba' }}>Save song</Button>
                        </View>
                        <View style={styles.wordWrapper}>
                            <ScrollView >
                                <View style={styles.wordContainer}>
                                    {buttons.map((word : any, idx : number) => {
                                        return <Button
                                                    style={(darkmode) ? dark.wordButton : styles.wordButton }
                                                    key={idx}
                                                    labelStyle={{ color: '#adb1ba' }}
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
                                <Text style={(darkmode) ? dark.text : styles.text}>Suggestions</Text>
                                <View style={styles.suggestionContainer} >
                                    <ScrollView horizontal>
                                        {matches.map((match : any, idx : number) => {
                                                return <Button
                                                            style={(darkmode) ? dark.suggestionButton : styles.suggestionButton }
                                                            key={idx}
                                                            labelStyle={{ color: '#adb1ba' }}
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
                style={(darkmode) ? dark.input : styles.input}
                placeholderTextColor='#adb1ba'
                placeholder="Start versing..."
                value={verse}
                autoCapitalize='none'
                onChangeText={verse => setVerse(verse)}
            >
            </TextInput>
            </View>
        </View>
    </>
  );
}
const dark = StyleSheet.create({
    container1: {
        width: '100%',
        height: '100%',
        backgroundColor: '#263340'
    },
    container: {
        margin: 10,
        flexWrap: 'wrap',
        backgroundColor: '#263340'
    },
    input: {
        marginBottom: 20,
        marginTop: 20,
        position: 'absolute',
        width: '100%',
        top: 355,
        backgroundColor: '#2f3d4c',
        color: '#adb1ba',
        padding: 15
    },
    saveSong: {
        backgroundColor: '#21a651',
        borderWidth: 0
    },
    saveSongContainer: {
        paddingBottom: 5
    },
    dialog: {
        height: 200,
        flexDirection: 'column',
    },
    songInput: {
        width: '100%'
    },
    wordWrapper: {
        width: '100%',
        height: 250,
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    wordButton: {
        margin: 1,
        borderRadius: 5,
        backgroundColor: '#1d2833',
        color: '#adb1ba',
        borderColor: '#adb1ba',
    },
    suggestionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    suggestionButton: {
        margin: 1,
        borderRadius: 5,
        backgroundColor: '#2f3d4c',
        borderColor: '#adb1ba',
    },
    text: {
       paddingBottom: 5,
       paddingTop: 5,
       color: '#adb1ba',
    }
})

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
        top: 355
    },
    saveSong: {
        backgroundColor: "limegreen",
    },
    saveSongContainer: {
        paddingBottom: 5
    },
    dialog: {
        height: 200,
        flexDirection: 'column',
    },
    songInput: {
        width: '100%'
    },
    wordWrapper: {
        width: '100%',
        height: 250,
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