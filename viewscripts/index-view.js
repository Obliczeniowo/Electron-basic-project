const ipcRenderer = require("electron").ipcRenderer;

window.addEventListener("load", () => {
  const okButton = document.querySelector("#ok");
  const msgInput = document.querySelector("input[type='text']");

  okButton.addEventListener("click", () => {
    const message = msgInput.value;
    ipcRenderer.send("electron-log-message", `Message: ${message}`);
  });

  msgInput.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      const message = msgInput.value;
      ipcRenderer.send("electron-log-message", `Message: ${message}`);
      msgInput.value = "";
    }
  });
});
