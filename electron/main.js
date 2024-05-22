const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const compactWin = new BrowserWindow({
      width: 540,
      height: 720,
      webPreferences: {
        preload: 'http://localhost:4173'
      }
    })
    compactWin.setMenuBarVisibility(false)
    compactWin.loadURL('http://localhost:4173')
  }
//opening
  app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })

  })
//closing (window or Linux)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })