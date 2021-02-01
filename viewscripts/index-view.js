const ipcRenderer = require('electron').ipcRenderer

window.addEventListener(
    "load",
    () => {
        document.querySelector('#ok').addEventListener(
            "click",
            () => {
                 ipcRenderer.send('electron-log-message', 'First message from electron log')
            }
        )
    }
)