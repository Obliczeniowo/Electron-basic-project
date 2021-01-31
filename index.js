/** importowanie instanji aplikacji i klasy BrowserWindow umożliwiającej
 *  tworzenie nowego okna programu
 */
const { app, BrowserWindow } = require('electron')

/**
 * Funkcja tworząca okno programu
 */
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  /**
   * Tutaj wskazywany jest plik widoku okna
   */
  win.loadFile('index.html')
}

/**
 * Gdy aplikacja jest gotowa można utworzyć okno programu
 */
app.whenReady().then(createWindow)

/**
 * Na zdarzenie zamknięcia wszystkich okien programu należy zakończyć
 * żywot programu
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/**
 * Gdy program jest aktywowany a liczba okien jest równa 0 to utwórz okno programu
 */
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
