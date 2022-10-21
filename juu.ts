import * as FileSystem from 'expo-file-system';

let filename = "songs.json"

const fileUri: string = `${FileSystem.documentDirectory}${filename}`;
/*const download = async () => {
  const downloadedFile: FileSystem.FileSystemDownloadResult = await FileSystem.downloadAsync(uri, fileUri);
  if (downloadedFile.status != 200) {
    console.log("ei toimi");
  }
  return downloadedFile;
};*/

console.log(fileUri);

//console.log(download);