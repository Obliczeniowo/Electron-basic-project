const electron = require("electron");
const ipcRenderer = require("electron").ipcRenderer;
ipcRenderer.on("sending-maesage", (event, arg) => {
  let p = document.createElement('p');
  p.innerText = arg;
  document.querySelector('#messages').appendChild(
    p
  ); 
});