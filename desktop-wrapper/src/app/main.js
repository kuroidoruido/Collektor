const { app, BrowserWindow } = require('electron');
const kill = require('tree-kill');

var javaPath = app.getAppPath() + '/vendor/jvm/bin/java';
var jarPath = app.getAppPath() + '/vendor/collektor-web.jar';
var child = require('child_process').spawn(
  javaPath, ['-jar', '--enable-preview', jarPath, '']
);

app.whenReady().then(() => {
    const win = new BrowserWindow({
        title: 'Collektor',
        width: 1024,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            defaultEncoding: 'UTF-8',
            nodeIntegration: true,
            contextIsolation: true,
        }
    });
    win.loadURL('http://localhost:17177');
    
    win.once('ready-to-show', () => {
      win.show();
    });

    win.on('closed', () => {
        kill(child.pid);
    });
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

app.on('window-all-closed', () => {
    app.quit();
});