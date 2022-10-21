import * as FileSystem from 'expo-file-system';

export interface Song {
    id : number,
    songName : string,
    songLyrics : string
    date : string | Date
}

class songs {
    private filename = "songs.json"
    private fileUri: string = `${FileSystem.documentDirectory}${this.filename}`;
    public data : Song[] = [];

    constructor(){
        FileSystem.readAsStringAsync(this.fileUri)
            .then((dataStr : string) => {
                this.data = JSON.parse(dataStr);
            })
            .catch((e : any) => {
                this.data = [];
            });
    }

    public getAllSongs = async () : Promise<any> => {
        try  {
            return this.data;
        } catch (error) {
                throw console.log(error);
            }
        }

//todays formatting to form dd.mm.yyyy
    public formatDate = (date : Date) => {
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

    public addSong = async (name : string, lyrics : string) : Promise<void> => {
        let today = new Date();
        let oldSongs = this.data;
        let array = [];
        array.push(oldSongs);
        let newSong : Song;
            newSong = {
                id: array[array.length - 1] + 1,
                songName: name,
                songLyrics: lyrics,
                date: this.formatDate(today)
            }
        array = [...array, newSong];
        console.log(array);
        let stringArray = JSON.stringify(array)
        await FileSystem.writeAsStringAsync(this.fileUri, stringArray);
    }

    private save = async () : Promise<any> => {
        try {
            await FileSystem.writeAsStringAsync(this.fileUri, JSON.stringify(this.data));
        } catch (error) {
            throw console.log(error);
        }
    }

    public erase = async () : Promise<any> => {
        try {
            let emptyJson : Song = {
                id: 0,
                songName: "Example Song",
                songLyrics: "Lyrics",
                date: "today"
            }
            let empty = JSON.stringify(emptyJson);
            await FileSystem.writeAsStringAsync(this.fileUri, empty);
        } catch (error) {
            throw console.log(error);
        }
    }

    public delete = async (id : number) : Promise<any> => {
        this.data = this.data.filter((song : Song) => {
            return song.id !== id;
        })
        this.data.sort((a, b) => {
            return a.id - b.id;
        });
        await this.save();
    }
}

export default new songs();