/** importowanie instanji aplikacji i klasy BrowserWindow umożliwiającej
 *  tworzenie nowego okna programu
 */
const { app, BrowserWindow } = require("electron");

// ustawia produkcyjną wersję
process.env.NODE_ENV = 'production';

/**
 * Funkcja tworząca okno programu
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  /**
   * Tutaj wskazywany jest plik widoku okna
   */
  win.loadFile("index.html");
}

/**
 * Gdy aplikacja jest gotowa można utworzyć okno programu
 */
app.whenReady().then(createWindow);

/**
 * Na zdarzenie zamknięcia wszystkich okien programu należy zakończyć
 * żywot programu
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * Gdy program jest aktywowany a liczba okien jest równa 0 to utwórz okno programu
 */
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const mainMenuTemplate = [
  {
    label: "Program",
    submenu: [
      {
        label: "Zamknij",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

// jeżeli mac to dodaj pusty obiekt do menu, żeby się poprawnie wyświeltało

if (process.platform === "darwin") {
  mainMenuTemplate.unshift({});
}

// dodaj narzędzia deweloperskie, jeżeli nie jesteś w trybie deweloperskim

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push(
      {
        label: 'Developer tools',
        submenu: [
          {
            label: 'Toogle dev tools',
            accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
            click(
              item,
              focusedWindow
            ) {
              mainWindow.webContents.openDevTools()
            }
          }
        ]
      }
    )
  }
  