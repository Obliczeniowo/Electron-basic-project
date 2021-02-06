/**
 * import ipcRenderer-a umożliwiającego wysyłanie informacji
 */
const ipcRenderer = require("electron").ipcRenderer;

const electron = require("electron");

let newViewWindow = undefined;

window.addEventListener("load", () => {
  const btHome = document.querySelector("#home");

  btHome.addEventListener(
    "click",
    () => {
      if (newViewWindow) {
        newViewWindow.close()
        newViewWindow = null;
      }
      ipcRenderer.send('change-win-route', 'home');
    }
  )
});
