const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        alwaysOnTop:true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        // icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
        title: 'My App',
    });

    win.loadURL('http://127.0.0.1:8080/');
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