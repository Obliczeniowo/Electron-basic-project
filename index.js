/** importowanie instanji aplikacji i klasy BrowserWindow umożliwiającej
 *  tworzenie nowego okna programu oraz obiektu menu
 */
const { app, BrowserWindow, Menu, ipcMain } = require("electron");

const { Messages } = require("./electronscripts/messages");

const { InitializeApp } = require("./electronscripts/initialize");

const { Routing, RouteItem } = require("./electronscripts/routing");

// ustawia produkcyjną wersję
process.env.NODE_ENV = "dev"; // 'production';

let win

let winRouting = new Routing(win , [])

let initializeApp = new InitializeApp();

ipcMain.on(
  'change-win-route',
  (e, routePath) => {
    console.log(routePath);
    winRouting.changeRoute(routePath)
  }
)

/**
 * Funkcja tworząca okno programu
 */
function createWindow() {
  win = new BrowserWindow({
    width: initializeApp.initialData.windowWidth,
    height: initializeApp.initialData.windowHeight,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  /**
   * Tutaj wskazywany jest plik widoku okna
   */
  win.loadFile("index.html");

  winRouting = new Routing(win , [
    new RouteItem('home', null, './index.html', [
      new RouteItem('subRouting', null, './sub-routing-view.html')
    ]),
    new RouteItem('trussCalculator', null, './truss-calculator.html', [])
  ])

  Messages.initMessages(win);

  win.on("resize", (event) => {
    let size = win.getSize()
    initializeApp.initialData.windowWidth = size[0];
    initializeApp.initialData.windowHeight = size[1];
  })

  /**
   * Tworzenie menu
   */
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  /**
   * Dodanie menu do okna
   */
  Menu.setApplicationMenu(mainMenu);
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
  initializeApp.save();
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

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer tools",
    submenu: [
      {
        label: "Toogle dev tools",
        accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.webContents.openDevTools();
        },
      },
    ],
  });
}
