const { app, BrowserWindow } = require('electron');
const path = require("path")
const { readFileSync } = require("fs")
function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        alwaysOnTop:true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation:false,
            nodeIntegrationInSubFrames:true,
            nodeIntegrationInWorker:true

        },
        icon: path.join(__dirname, './assets/pAudio.jpeg'),
    });

    // win.loadURL('https://www.google.com/');
    win.loadURL('http://localhost:8080/');
    // win.webContents.openDevTools();
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
