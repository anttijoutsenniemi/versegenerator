import React, { useState, useEffect  } from 'react';
import { Text, Button, Dialog, Portal } from 'react-native-paper';
import { StyleSheet, View, ScrollView, TextInput, Alert } from 'react-native';
import wordlist from '../words.json';
import sanalista from '../sanalista.json';

/*interface ContentProps {
    buttons : string[];
    setButtons : Dispatch<SetStateAction<string[]>>
    saveSong : any;
}*/

interface ContentProps {
    saveSong: any;
}

const FinnishContent : React.FC<ContentProps> = (props) : React.ReactElement => {
    const [verse, setVerse] = useState<string>("");
    const [matches, setMatches] = useState<any>([]);
    const [error, setError] = useState<string>("");
    const [matchesExist, setMatchesExist] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [buttons, setButtons] = useState<string[]>([]);
    const [buttonsExist, setButtonsExist] = useState<boolean>(false);
    const [songName, setSongName] = useState<string>("");
    const [visible, setVisible] = React.useState<boolean>(false);
    const [darkmode, setDarkmode] = React.useState<boolean>(true);
    const [suomi, setSuomi] = useState<boolean>(true);
    
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
        alert("Riimit tallennettu!");
    }

    const deleteSong = () => {
        setButtonsExist(false);
        setButtons([]);
    }

    const deleteSongAlert = () =>
    Alert.alert(
      "Oletko varma että haluat poistaa riimit?",
      " ",
      [
        {
          text: "Kumoa",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Poista riimit", onPress: () => deleteSong() }
      ]
    );

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
            for(let i = startingNumber; i < sanalista['st'].length; i = i + increment){
                sanalista['st'][0].s
                loopCount++;
                if(sanalista['st'][i].s.endsWith(end3)){
                    results.push(sanalista['st'][i].s);
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
                for(let i = 0; i < sanalista['st'].length; i++){
                    secondLoopCount++;
                    if(sanalista['st'][i].s.endsWith(end2)){
                        results.push(sanalista['st'][i].s);
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
            <Dialog style={dark.dialogWrapper} visible={visible} dismissable onDismiss={hideDialog}>
                <View style={dark.dialog}>
                    <Dialog.Title style={{color: 'white'}}>Nimeä riimisi</Dialog.Title>
                        <Dialog.Content>
                        <TextInput
                            autoFocus
                            style={dark.songInput}
                            value={songName}
                            onChangeText={songName => setSongName(songName)}
                        ></TextInput>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button labelStyle={{color: 'white'}} onPress={() => hideDialog()}>Sulje</Button>
                        <Button labelStyle={{color: '#21a651'}} mode='outlined' onPress={() => sendSong()}>Valmis</Button>
                    </Dialog.Actions>
                </View>
            </Dialog>
        </Portal>
            {
                (buttonsExist)
                ? 
                    <>  
                        <View style={dark.saveSongContainer}>
                        <Button onPress={()=> deleteSongAlert()} style={(darkmode) ? dark.deleteSong : styles.deleteSong } labelStyle={{ color: 'white' }}>Poista riimit</Button>
                        <Button onPress={()=> saveSong()} style={(darkmode) ? dark.saveSong : styles.saveSong } labelStyle={{ color: 'white' }}>Tallenna riimit</Button>
                        </View>
                        <View style={styles.wordWrapper}>
                            <ScrollView >
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
                        
                        {(matchesExist)
                        ? 
                            <>
                                <Text style={(darkmode) ? dark.text : styles.text}>Ehdotukset</Text>
                                <View style={styles.suggestionContainer} >
                                    <ScrollView horizontal>
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
                    </>
                : null
            }
            <TextInput
                style={(darkmode) ? dark.input : styles.input}
                placeholderTextColor='white'
                placeholder="Aloita riimittely..."
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


export default FinnishContent;