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
        loginUser(user) {
            return ipcRenderer.invoke('signin', user);
        },
        saveItem(item) {
            ipcRenderer.send('save-item', item)
        },
        async getItems() {
            return ipcRenderer.invoke('get-items');
        }
    }
});