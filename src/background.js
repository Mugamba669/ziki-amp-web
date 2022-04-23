"use strict";
import { autoUpdater } from "electron-updater"
import { app, protocol,BrowserWindow, ipcMain ,dialog} from 'electron';
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
import { readdirSync,  statSync, writeFileSync } from "fs";
import { extname, join } from 'path';
const { musixmatch } = require('4lyrics');
import { axios } from 'axios';
import cheerio from 'cheerio';
var MediaLibrary = require('media-library');

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);
function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        darkTheme:true,
        // frame:false,
        alwaysOnTop:true,
        webPreferences: {
          nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
          contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            // enableRemoteModule: process.env.ELECTRON_NODE_INTEGRATION,
            // enableBlinkFeatures:process.env.ELECTRON_NODE_INTEGRATION,
            // nodeIntegrationInSubFrames:process.env.ELECTRON_NODE_INTEGRATION,
            // nodeIntegrationInWorker:process.env.ELECTRON_NODE_INTEGRATION

        },
        icon:isDevelopment?join(__dirname,'./assets/pAudio.png'):"app://./pAudio.png",
    });
  
    //    ipcMain.on('openDir',(event,args)=>{
    //        let temp = [];
    //         let db =[];
    //         let directories = [];
    //         var recursiveFolders = (dir)=>{
    //             var store = readdirSync(dir);
    //             store.forEach((track,index)=>{
    //                 //  
    //                 let newPath = dir+'/'+track;
    //                 if(statSync(newPath).isDirectory() == true){
    //                      recursiveFolders(newPath);
    //                      directories = [...directories,{dir:newPath}]
    //                 }else if(statSync(newPath).isFile() == true && extname(newPath) == ".mp3"){
    //                     console.log(newPath);
    //                     temp = [...temp,{track:newPath}];
    //                 }
    //             });
    //           }
    //           dialog.showOpenDialog(win,{
    //               properties:['openDirectory'],
    //               defaultPath:app.getPath("music"),
    //               buttonLabel:"Select music folder",
    //               title:"Choose a folder"

    //           }).then((filePath)=>{
    //           recursiveFolders(filePath.filePaths[0]);
    //            event.sender.send('files',[...db,temp,directories]);
    //           });
    //    });
    /***
     * Get hot 100
     */
        let stream = [];
       ipcMain.on('hot100',(e,url)=>{
           axios.get(url).then((response)=>{
              var dom = response.data;
            //   console.log(dom);
              
              const ch = cheerio.load(dom);
              let trackList = ch('.hot100')
              // let trackPic = ch('img.imagefillstr');
          trackList.each((index,element)=>{
              let hot100 = {
                  title:`${element.children[0].children[5].children[0].children[0].data}`,
                  artist:`${element.children[0].children[5].children[1].children[0].data}`,
                  artWork:`${element.children[0].children[3].children[1].attribs.data}`,
                  url:element.children[2].children[3].children[1].attribs.src
              }
              stream = [...stream,hot100];
            //   console.log(stream)
              writeFileSync("stream.json",JSON.stringify(stream));
            });
        //    e.sender.send('stream',dom);

         });

    })
       ipcMain.on('dataList',(e,args)=>{
        // var library = new MediaLibrary({
        //   // persistent storage location (optional)
        //   dataPath: '/home/blabs/Music',
        //   // the paths to scan
        //   paths: [ '/home/blabs/Music' ]
        // });
        //  library.scan().on('done', () => {
        //   // listing all tracks
        //   library.tracks((err, tracks) => e.sender.send('lib',tracks));
        // });
         
       })
     //***fetch lyrics */
     ipcMain.on('fetchLyrics',(e,data)=>{
        musixmatch.getURL(`${data[0]} ${data[1]}`).then((url)=>{
            musixmatch.getLyrics(url).then((lyrics)=>{
              console.log(lyrics);
            e.sender.send('lyrics',lyrics);
            }).catch((error) => dialog.showErrorBox("Lyrics Error",`${error}`))
        });
     
     });
     if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
       win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    } else {
      createProtocol('app');
      win.loadURL('app://./index.html');
      //  Load the index.html when not in development
      autoUpdater.checkForUpdatesAndNotify();// for auto updates
    }
  
}
app.whenReady().then(()=>{
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
           installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
          console.error("Vue Devtools failed to install:", e.toString());
        }
      }
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

/**
 *  "media-library": "^1.2.4",
 * "node-sass":"^8.12.0"
 */
