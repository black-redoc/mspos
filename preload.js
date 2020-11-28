const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    notificationApi: {
        sendNotificacion(message) {
            ipcRenderer.send('notify', message);
        }
    },
    filesApi: {
        
    }
});