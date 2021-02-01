/**
 * miport ipcMain umożliwiającego odbieranie informacji
 */
const { ipcMain } = require("electron");

class Messages {
  static initMessages(mainWindow) {
    ipcMain.on("ipcFirstContact-message", (e, item) => {
      e.returnValue = item;
      mainWindow.webContents.send("ipcFirstContact-response", item);
    });

    /**
     * na zdarzenie 'electron-log-message' wyświetlić w konsoli przesyłane dane i
     * zwrócić wartość potwierdzającą jej odebranie
     */
    ipcMain.on("electron-log-message", (e, message) => {
      console.log(message);
      e.returnValue = "sended";
    });
  }
}

module.exports.Messages = Messages;
