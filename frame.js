const { app, BrowserWindow, ipcMain ,dialog} = require('electron');
const path = require("path")
const { readdirSync,  statSync } = require("fs");
const { extname } = require('path');

function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        alwaysOnTop:true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            enableBlinkFeatures:true,
            contextIsolation:false,
            nodeIntegrationInSubFrames:true,
            nodeIntegrationInWorker:true

        },
        icon: path.join(__dirname, './dist/pAudio.png'),
    });
    // win.loadFile(path.join(__dirname,"./dist/index.html"));
    // if (process.env.WEBPACK_DEV_SERVER_URL) {

    //     // // Load the url of the dev server if in development mode
    //     // win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    //     // if (!process.env.IS_TEST) win.webContents.openDevTools()
    // } else {
       ipcMain.on('openDir',(event,args)=>{
           let temp = [];
            let db =[];
            let directories = [];
            var recursiveFolders = (dir)=>{
                var store = readdirSync(dir);
                store.forEach((track,index)=>{
                    //  
                    let newPath = dir+'/'+track;
                    if(statSync(newPath).isDirectory() == true){
                         recursiveFolders(newPath);
                         directories = [...directories,{dir:newPath}]
                    }else if(statSync(newPath).isFile() == true && extname(newPath) == ".mp3"){
                        console.log(newPath);
                        temp = [...temp,{track:newPath}];
                    }
                });
              }
              dialog.showOpenDialog(win,{
                  properties:['openDirectory'],
                  defaultPath:app.getPath("music"),
                  buttonLabel:"Select music folder",
                  title:"Choose a folder"

              }).then((filePath)=>{
              recursiveFolders(filePath.filePaths[0]);
               event.sender.send('files',[...db,temp,directories]);
              });
       });

       ipcMain.on('done',(e,a)=>{
           console.log(a);
       })
     
       //updating app icon
       ipcMain.on('iconUp',(event,args)=>{
        //    win.setIcon(args);
        //    dialog.showErrorBox("Not an error",args);
       })
    if(process.env.NODE_ENV == 'production'){
        // createProtocol('app')
            // Load the index.html when not in development
            win.loadURL(
                url.format({
                  pathname: path.join(__dirname, `./dist/index.html`),
                  protocol: "file:",
                  slashes: true
                })
              );

    }else{
      win.loadURL('http://localhost:8080/');
    }
    
}
app.whenReady().then(createWindow);

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
