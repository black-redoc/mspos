const { app, BrowserWindow, ipcMain, Notification, dialog } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;
require('./model/db');
const { User } = require('./model/user');
const { Item } = require('./model/item');

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

ipcMain.on('save-item', async (e, { name, price, stockApplies, stock, code, photo_url, photo_name }) => {
    const fs = require('fs');

    const dest_file = path.join(__dirname, 'public', photo_name);

    fs.copyFileSync(photo_url, dest_file);

    const newItem = new Item({
        name, price, stockApplies, stock, code, photo: dest_file
    });

    try {
        const res = await newItem.save();
        if (res) handleNotification({
            title: "info",
            message: `Se ha agregado el Item ${res.name}`,
        })
    } catch (err) {
        if (err) handleError(err);
    }
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