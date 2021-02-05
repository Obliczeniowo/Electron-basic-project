/**
 * import ipcRenderer-a umożliwiającego wysyłanie informacji
 */
const ipcRenderer = require("electron").ipcRenderer;

const electron = require("electron");

let newViewWindow = undefined;

window.addEventListener("load", () => {
  const okButton = document.querySelector("#ok");
  const msgInput = document.querySelector("input[type='text']");
  const obliczeniowoButton = document.querySelector("#show-brand-new-widnow");
  const newWindow = document.querySelector("#new-window");

  okButton.addEventListener("click", () => {
    const message = msgInput.value;
    /**
     * Wysyłanie informacji
     */
    ipcRenderer.send("electron-log-message", `Message: ${message}`);
  });

  msgInput.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      const message = msgInput.value;
      /**
       * Wysyłanie informacji
       */
      ipcRenderer.send("electron-log-message", `Message: ${message}`);
      msgInput.value = "";

      if (newViewWindow !== undefined) {
        newViewWindow.webContents.send("sending-maesage", message);
      }
    }
  });

  obliczeniowoButton.addEventListener("click", () => {
    /**
     * Otwieranie okna i załadowanie strony obliczeniowo.com.pl
     */
    window.open("https://obliczeniowo.com.pl", "_blank", "nodeIntegration=no");
  });

  newWindow.addEventListener("click", () => {
    const BrowserWindow = electron.remote.BrowserWindow;

    /**
     * Gdy okno istnieje to wyślij do niego message
     */
    if (newViewWindow) {
      return;
    }
    /**
     * Tworzenie nowego okna z widoku
     */
    newViewWindow = new BrowserWindow({
      parent: electron.remote.getCurrentWindow(),
      width: 800,
      height: 700,
      modal: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });
    newViewWindow.loadFile("./new-view.html");

    newViewWindow.on("closed", () => {
      newViewWindow = undefined;
    });
  });
});
