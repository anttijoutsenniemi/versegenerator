import * as FileSystem from 'expo-file-system';

export interface Song {
    id : number,
    songName : string,
    songLyrics : string
    date : string | Date
}

class songs {
    private tiedostonimi : string = "C:\Users\Antti\Desktop\Paskaa\verse\songs.json";
    public data : Song[] = [];

    constructor(){
        FileSystem.readAsStringAsync(this.tiedostonimi)
            .then((dataStr : string) => {
                this.data = JSON.parse(dataStr);
            })
            .catch((e : any) => {
                this.data = [];
            });
    }

    public haeKaikki = async () : Promise<any> => {
        try  {
            return this.data;
        } catch (error) {
                throw {
                    "status" : 500,
                    "teksti" : "tiedostoa ei voitu avata"
                };
            }
        }

//tämän päivän formatointi muotoon pp.kk.vvvv
    public luoTanaan = (date : Date) => {
        let paiva : number | string = date.getDate();
        let kk : number | string = (date.getMonth() + 1);
            if(paiva < 10){
                paiva = '0' + paiva;
            }
            if(kk < 10){
                kk = '0' + kk;
            } 
        let formatoituTanaan = paiva + "." + kk + "." + date.getFullYear();
        return formatoituTanaan;
    }

    public lisaa = async (name : string, lyrics : string) : Promise<void> => {
        let today = new Date();
        let newSong : Song;
            newSong = {
                id: this.data[this.data.length -1].id + 1,
                songName: name,
                songLyrics: lyrics,
                date: this.luoTanaan(today)
            }
        this.data = [...this.data, newSong];
        await this.tallenna();
    }

    private tallenna = async () : Promise<any> => {
        try {
            await FileSystem.writeAsStringAsync(this.tiedostonimi, JSON.stringify(this.data, null, 2));
        } catch (error) {
            return {
                "status": 500,
                "teksti": "tiedostoa ei voitu tallentaa"
            }
        }
    }

    public poista = async (id : number) : Promise<any> => {
        this.data = this.data.filter((song : Song) => {
            return song.id !== id;
        })
        this.data.sort((a, b) => {
            return a.id - b.id;
        });
        await this.tallenna();
    }
}

export default new songs();