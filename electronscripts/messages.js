const { ipcMain } = require("electron");

class Messages {
  static initMessages(mainWindow) {

    ipcMain.on("ipcFirstContact-message", (e, item) => {
      e.returnValue = item;
      mainWindow.webContents.send("ipcFirstContact-response", item);
    });

    ipcMain.on("electron-log-message", (e, message) => {
      console.log(message);
      e.returnValue = "sended";
    });
  }
}

module.exports.Messages = Messages;