import React, { useState, useEffect } from 'react';
import { Text, Button, Dialog, Portal } from 'react-native-paper';
import { StyleSheet, View, ScrollView, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import wordlist from '../words.json';
import * as FileSystem from 'expo-file-system';

/*interface ContentProps {
    buttons : string[];
    setButtons : Dispatch<SetStateAction<string[]>>
    saveSong : any;
}*/

interface ContentProps {
    saveSong: any,
    editButtons: string[]
}

const Content : React.FC<ContentProps> = (props) : React.ReactElement => {
    const [verse, setVerse] = useState<string>("");
    const [matches, setMatches] = useState<any>([]);
    const [matchesExist, setMatchesExist] = useState<boolean>(false);
    const [buttons, setButtons] = useState<string[]>([]);
    const [buttonsExist, setButtonsExist] = useState<boolean>(false);
    const [songName, setSongName] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [darkmode, setDarkmode] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [lastWord, setLastWord] = useState<string>("");
    const [buttonPressed, setButtonPressed] = useState<number>(0);
    
    useEffect(() => {
        if(verse.endsWith(" ")){
            createButton();
        }
        setError("");
        setMatchesExist(false);
    }, [verse]);

    useEffect(() => {
        if(props.editButtons[1]){
            setButtons(props.editButtons);
            setButtonsExist(true);
        }
        else {
            loadSessionData();
        }
    }, []);

    const loadSessionData = async () => {
        let filename = "sessiondata.json"
        let fileUri: string = `${FileSystem.documentDirectory}${filename}`;
        if((await FileSystem.getInfoAsync(fileUri)).exists === false){
            let empty : string[] = [];
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(empty));
        }
        let json = await FileSystem.readAsStringAsync(fileUri);
        setButtons(JSON.parse(json));
        setButtonsExist(true);
    }

    const clearSessionData = async () => {
        let filename = "sessiondata.json";
        let fileUri: string = `${FileSystem.documentDirectory}${filename}`;
        if((await FileSystem.getInfoAsync(fileUri)).exists){
            console.log("paska")
            await FileSystem.deleteAsync(fileUri);
        }
        setButtonsExist(false)
    }

    const updateSessionData = async (lastWord : string) => {
        let filename = "sessiondata.json";
        let fileUri: string = `${FileSystem.documentDirectory}${filename}`;
        let json = [...buttons, lastWord];
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(json));
    }

    const createButton = () => {
        let verseArray = verse.trim().split(" ");
        let lastWord = verseArray[verseArray.length - 1];
        setButtons([...buttons, lastWord]);
        setVerse("");
        setButtonsExist(true);
        updateSessionData(lastWord)
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
        saveSongAlert();
    }

    const deleteSong = () => {
        setButtonsExist(false);
        setButtons([]);
        clearSessionData();
    }

    const saveSongAlert = () =>
    Alert.alert(
      "Song saved!",
      " ",
      [
        {
          text: "OK",
          style: "default"
        }
      ]
    );

    const deleteSongAlert = () =>
    Alert.alert(
      "Are you sure u want to delete your verse?",
      " ",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete verse", onPress: () => deleteSong() }
      ]
    );

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const findMatch = (word : string) => {
        setLastWord(word);
        let startingNumber : number = Math.floor(Math.random() * 1000) + 1;
        let increment : number = Math.floor(Math.random() * 20) + 1;
        let end3 : string = word[word.length - 3] + word[word.length - 2] + word[word.length - 1];
        let end2 :  string = word[word.length - 2] + word[word.length - 1];
        let end1 :  string = word.substring(1);
        let matchCount : number = 0;
        let loopCount : number = 0;
        let longWordsCount : number = 0;
        let secondLoopCount : number = 0;
        let thirdLoopCount : number = 0;
        let fourthLoopCount : number = 0;
        let fifthLoopCount : number = 0;
        let results = [];
        setError("");
        setMatchesExist(false);

    //if word is same as last one
        if(lastWord === word){
            setButtonPressed(buttonPressed + 1);
            console.log(buttonPressed);
    //check for long words on second click
            if(buttonPressed === 0){
                for(let i = wordlist.words.length - 1; i > 0; i--){
                    loopCount++;
                    if(wordlist.words[i].endsWith(word)){
                        results.push(wordlist.words[i]);
                        matchCount++
                    }
                    if(matchCount >= 40){
                        break;
                    }
                    if(longWordsCount >= 100000){
                        break;
                    }
                }
                if(matchCount < 40){
                    for(let i = 0; i < wordlist.words.length; i++){
                        fifthLoopCount++;
                        if(wordlist.words[i].endsWith(end1)){
                            results.push(wordlist.words[i]);
                            matchCount++
                        }
                        if(matchCount >= 40){
                            break;
                        }
                        if(fifthLoopCount >= 100000){
                            break;
                        }
                    }
                }
                if(matchCount < 40){
                    for(let i = 0; i < wordlist.words.length; i++){
                        secondLoopCount++;
                        if(wordlist.words[i].endsWith(word) || wordlist.words[i].endsWith(end1)){
                            results.push(wordlist.words[i]);
                            matchCount++
                        }
                        if(matchCount >= 40){
                            break;
                        }
                        if(secondLoopCount >= 100000){
                            break;
                        }
                    } 
                }
                if(matchCount < 40){
                    for(let i = 0; i < wordlist.words.length; i++){
                        thirdLoopCount++;
                        if(wordlist.words[i].endsWith(end3)){
                            results.push(wordlist.words[i]);
                            matchCount++
                        }
                        if(matchCount >= 40){
                            break;
                        }
                        if(thirdLoopCount >= 100000){
                            break;
                        }
                    } 
                }
                if(matchCount < 40){
                    for(let i = 0; i < wordlist.words.length; i++){
                        fourthLoopCount++;
                        if(wordlist.words[i].endsWith(end2)){
                            results.push(wordlist.words[i]);
                            matchCount++
                        }
                        if(matchCount >= 40){
                            break;
                        }
                        if(fourthLoopCount >= 100000){
                            if(matchCount <= 0){
                                setError("No word matches")
                            }
                            break;
                        }
                    }
                }
            }
// search random words on third press
            if(buttonPressed === 1){
                for(let i = startingNumber; i < wordlist.words.length; i = i + increment){
                    loopCount++;
                    if(wordlist.words[i].endsWith(end1)){
                        results.push(wordlist.words[i]);
                        matchCount++
                    }
                    if(matchCount >= 40){
                        break;
                    }
                    if(loopCount >= 100000){
                        console.log("first");
                        break;
                    }
                }
                if(matchCount < 40){
                    for(let i = startingNumber; i < wordlist.words.length; i = i + increment){
                        fifthLoopCount++;
                        if(wordlist.words[i].endsWith(end3)){
                            results.push(wordlist.words[i]);
                            matchCount++
                        }
                        if(matchCount >= 40){
                            break;
                        }
                        if(fifthLoopCount >= 100000){
                            if(matchCount <= 0){
                                setError("No word matches")
                            }
                            break;
                        }
                    }
                }
            }
//go back to normal word matches next
            if(buttonPressed === 2){
                for(let i = 0; i < wordlist.words.length; i++){
                    loopCount++;
                    if(wordlist.words[i].endsWith(word)){
                        results.push(wordlist.words[i]);
                        matchCount++
                    }
                    if(matchCount >= 40){
                        break;
                    }
                    if(loopCount >= 100000){
                        break;
                    }
                }
        // search db for words that miss the first letter
                if(matchCount < 40){
                    for(let i = 0; i < wordlist.words.length; i = i++){
                        fifthLoopCount++;
                        if(wordlist.words[i].endsWith(end1)){
                            results.push(wordlist.words[i]);
                            matchCount++
                        }
                        if(matchCount >= 40){
                            break;
                        }
                        if(fifthLoopCount >= 100000){
                            break;
                        }
                    }
                }
        //search db for words that match on last 3 characters
                if(matchCount < 40){
                    for(let i = 0; i < wordlist.words.length; i++){
                        thirdLoopCount++;
                        if(wordlist.words[i].endsWith(end3)){
                            results.push(wordlist.words[i]);
                            matchCount++
                        }
                        if(matchCount >= 40){
                            break;
                        }
                        if(thirdLoopCount >= 100000){
                            break;
                        }
                    } 
                }
        //search db for words that match on last 2 characters
                if(matchCount < 40){
                    for(let i = 0; i < wordlist.words.length; i++){
                        fourthLoopCount++;
                        if(wordlist.words[i].endsWith(end2)){
                            results.push(wordlist.words[i]);
                            matchCount++
                        }
                        if(matchCount >= 40){
                            break;
                        }
                        if(fourthLoopCount >= 100000){
                            if(matchCount <= 0){
                                setError("No word matches")
                            }
                            break;
                        }
                    } 
                }
                //reset counter
                setButtonPressed(0);
            }
        }
//search db for perfect matches first if word is not same 
        else {
            setButtonPressed(0);
            for(let i = 0; i < wordlist.words.length; i++){
                loopCount++;
                if(wordlist.words[i].endsWith(word)){
                    results.push(wordlist.words[i]);
                    matchCount++
                }
                if(matchCount >= 40){
                    break;
                }
                if(loopCount >= 100000){
                    break;
                }
            }
    // search db for words that miss the first letter
            if(matchCount < 20){
                for(let i = 0; i < wordlist.words.length; i = i++){
                    fifthLoopCount++;
                    if(wordlist.words[i].endsWith(end1)){
                        results.push(wordlist.words[i]);
                        matchCount++
                    }
                    if(matchCount >= 40){
                        break;
                    }
                    if(fifthLoopCount >= 100000){
                        break;
                    }
                }
            }
    //search db for words that match on last 3 characters
            if(matchCount < 40){
                for(let i = 0; i < wordlist.words.length; i++){
                    thirdLoopCount++;
                    if(wordlist.words[i].endsWith(end3)){
                        results.push(wordlist.words[i]);
                        matchCount++
                    }
                    if(matchCount >= 40){
                        break;
                    }
                    if(thirdLoopCount >= 100000){
                        break;
                    }
                } 
            }
    //search db for words that match on last 2 characters
            if(matchCount < 40){
                for(let i = 0; i < wordlist.words.length; i++){
                    fourthLoopCount++;
                    if(wordlist.words[i].endsWith(end2)){
                        results.push(wordlist.words[i]);
                        matchCount++
                    }
                    if(matchCount >= 40){
                        break;
                    }
                    if(fourthLoopCount >= 100000){
                        if(matchCount <= 0){
                            setError("No word matches")
                        }
                        break;
                    }
                } 
            }
        }
        let filtered = results.filter((item : any, itemIndex : number) => item !== word);
        setMatches(filtered);
        setMatchesExist(true);
    }

  return (
    <>
        <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
        <View style={(darkmode) ? dark.container1 : styles.container }>
            <View style={(darkmode) ? dark.container : styles.container }>
        <Portal>
            <Dialog style={dark.dialogWrapper} visible={visible} dismissable onDismiss={hideDialog}>
                <View style={dark.dialog}>
                    <Dialog.Title style={{color: 'white'}}>Name your verse</Dialog.Title>
                        <Dialog.Content>
                        <TextInput
                            autoFocus
                            style={dark.songInput}
                            value={songName}
                            onChangeText={songName => setSongName(songName)}
                        ></TextInput>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button labelStyle={{color: 'white'}} onPress={() => hideDialog()}>Close</Button>
                        <Button labelStyle={{color: '#21a651'}} mode='outlined' onPress={() => sendSong()}>Done</Button>
                    </Dialog.Actions>
                </View>
            </Dialog>
        </Portal>
            {
                (buttonsExist && buttons[0])
                ? 
                    <>  
                        <View style={dark.saveSongContainer}>
                        <Button onPress={()=> deleteSongAlert()} style={(darkmode) ? dark.deleteSong : styles.deleteSong } labelStyle={{ color: 'white' }}>Delete verse</Button>
                        <Button onPress={()=> saveSong()} style={(darkmode) ? dark.saveSong : styles.saveSong } labelStyle={{ color: 'white' }}>Save verse</Button>
                        </View>
                        <View style={styles.wordWrapper}>
                            <ScrollView 
                                keyboardDismissMode='none'
                                keyboardShouldPersistTaps='handled'
                            >
                                <View style={styles.wordContainer}>
                                    {buttons.map((word : any, idx : number) => {
                                        return <Button
                                                    style={(darkmode) ? dark.wordButton : styles.wordButton }
                                                    key={idx}
                                                    labelStyle={{ color: 'white' }}
                                                    onPress={() => findMatch(word)}
                                                    onLongPress={() => deleteWord(idx)}
                                                >{word}</Button>
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </>
                : 
                <>
                    <View style={dark.infoContainer}>
                        <Text style={dark.infoText}>
                            How to Verse: start typing in to the box below, when you press spacebar, your word is automatically added above
                            as a button that you can press to find matches for it. Pressing suggested word will add it at the end of your verse.
                            Long pressing a word will delete it from your verse. More info in settings
                        </Text>
                    </View>
                </>
            }
            </View>
        </View>
        <View style={dark.keyboardContainer}>
        {(matchesExist)
                        ? 
                            <>
                                <Text style={(darkmode) ? dark.text : styles.text}>{(error !== "") ? error : "Suggestions"}</Text>
                                <View style={styles.suggestionContainer} >
                                    <ScrollView 
                                        horizontal
                                        keyboardDismissMode='none'
                                        keyboardShouldPersistTaps='handled'
                                    >
                                        {matches.map((match : any, idx : number) => {
                                                return <Button
                                                            style={(darkmode) ? dark.suggestionButton : styles.suggestionButton }
                                                            key={idx}
                                                            labelStyle={{ color: 'white' }}
                                                            onPress={() => putMatchInVerse(match)}
                                                        >{match}</Button>
                                            })}
                                    </ScrollView>
                                </View >
                            </>
                        : null
                        }
        <TextInput
                style={(darkmode) ? dark.input : styles.input}
                placeholderTextColor='white'
                placeholder="Start versing..."
                value={verse}
                autoCapitalize='none'
                onChangeText={verse => setVerse(verse)}
            >
        </TextInput>
        </View>
        </KeyboardAvoidingView>
    </>
  );
}
const dark = StyleSheet.create({
    keyboardContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#263340',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    infoContainer: {
        padding: 20,
    },
    infoText: {
        textAlign: 'center',
        color: 'white'
    },
    container1: {
        flex: 1,
        padding: 10,
        width: '100%',
        height: '100%',
        backgroundColor: '#263340',
    },
    container: {
        flexWrap: 'wrap',
        backgroundColor: '#263340'
    },
    input: {
        marginTop: 5,
        width: '100%',
        backgroundColor: '#2f3d4c',
        color: 'white',
        padding: 15
    },
    deleteSong: {
        backgroundColor: '#2f3d4c',
        borderWidth: 0,
        margin: 1,
        borderRadius: 5,
        width: '49.9%',
    },
    saveSong: {
        backgroundColor: '#21a651',
        borderWidth: 0,
        margin: 1,
        borderRadius: 5,
        width: '49.9%'
    },
    saveSongContainer: {
        paddingBottom: 5,
        flexDirection: 'row',
        width: '100%'
    },
    dialog: {
        flexDirection: 'column',
    },
    dialogWrapper: {
        backgroundColor: '#2f3d4c',
      },
    songInput: {
        width: '100%',
        backgroundColor: '#1d2833',
        color: 'white',
        padding: 15
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
        color: 'white',
        borderColor: 'white',
    },
    suggestionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        bottom: 0,
    },
    suggestionButton: {
        margin: 1,
        borderRadius: 5,
        backgroundColor: '#2f3d4c',
        borderColor: 'white',
    },
    text: {
       paddingBottom: 5,
       paddingTop: 5,
       color: 'white',
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
    deleteSong: {
        backgroundColor: '#2f3d4c',
        borderWidth: 0,
        margin: 1,
        borderRadius: 5,
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
        height: '80%',
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