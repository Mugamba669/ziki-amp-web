const { app, BrowserWindow } = require('electron');
const path = require("path")
const { readFileSync } = require("fs")
function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        alwaysOnTop:true,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: true,
            contextIsolation:false,
            nodeIntegrationInSubFrames:true,
            nodeIntegrationInWorker:true

        },
        icon: path.join(__dirname, './dist/pAudio.png'),
    });
    // win.loadFile(path.join(__dirname,"./dist/index.html"));
      win.loadURL('http://localhost:8080/');
    if (process.env.WEBPACK_DEV_SERVER_URL) {

        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
            // Load the index.html when not in development
            // win.loadURL(
            //     url.format({
            //       pathname: path.join(__dirname, `./dist/index.html`),
            //       protocol: "file:",
            //       slashes: true
            //     })
            //   );

    }
    // win.loadURL('https://www.google.com/');
    // win.loadURL('http://localhost:8080/');
    // win.loadURL('https://lw-web.netlify.app/');
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
