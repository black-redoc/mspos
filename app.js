const { app, BrowserWindow, ipcMain, Notification, dialog } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;
require('./model/db');
const { User } = require('./model/user');

var win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1024,
        height: 600,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.removeMenu();
    win.loadFile('index.html');
    if (isDev) win.webContents.openDevTools();
    win.maximize();
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

const handleError = msg => {
    console.error("error", msg)
    dialog.showErrorBox('Error', `Ha ocurido un error\n ${msg}`)
}

const handleNotification = ({ title, message }) => {
    new Notification({
        title: title,
        body: message
    }).show();
}

ipcMain.on('notify', (_, { title, message }) => {
    handleNotification({ title, message })
});

ipcMain.on('signup', (e, { username, password, isAdmin }) => {
    const newUser = new User({
        user_name: username,
        password,
        is_admin: isAdmin
    });

    newUser.save()
        .then(doc => {
            handleNotification({
                title: "Info",
                message: `Se ha registrado el usuario ${doc.user_name}`
            })
        })
        .catch(err => handleError(err))
});

ipcMain.handle('signin', async (e, { username, password }) => {
    const res = (await User.findOne({ user_name: username }).cursor().next())._doc;

    if (!res) return false;

    const bcrypt = require('bcrypt');
    return bcrypt.compare(password, res.password);
});

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