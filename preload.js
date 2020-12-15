const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    notificationApi: {
        sendNotificacion(message) {
            ipcRenderer.send('notify', message);
        }
    },
    dbApi: {
        createUser(currUser) {
            ipcRenderer.send('signup', currUser);
        },
        async loginUser(user) {
            return ipcRenderer.invoke('signin', user);
        },
        async saveItem(item) {
            await ipcRenderer.send('save-item', item)
        }
    }
});