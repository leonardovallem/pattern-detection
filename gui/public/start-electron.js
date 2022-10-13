const path = require('path');
const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require("fs")
const dialog = require("remote").require("dialog")

const isDev = process.env.IS_DEV === 'true';

ipcMain.on("save-image", (event, image) => {
    dialog.showSaveDialog(filePath => {
        if (!filePath) return

        fs.writeFile(filePath, image, err => {
            if (err) dialog.showErrorBox("Error", err.message)
            else dialog.showMessageBox({
                message: "Image saved successfully",
                buttons: ["Ok"]
            })
        })
    })
})

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    // Open the DevTools.
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        // mainWindow.removeMenu();
        mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
