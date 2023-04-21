import { SocialUser } from '@abacritt/angularx-social-login';
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { AppState } from '../src/app/core/types';
import { Setting } from './data/models/setting.schema';
import { User } from './data/models/user.schema';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

async function createWindow(): Promise<BrowserWindow> {
  //Connect database
  const SqlitDataSource = new DataSource({
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: __dirname + '/data/database.sqlite',
    entities: [Setting, User],
  });

  SqlitDataSource.initialize();

  const userRepo = SqlitDataSource.getRepository(User);
  const settingRepo = SqlitDataSource.getRepository(Setting);

  ipcMain.on('db:user:get', async (event: any, ...args: any[]) => {
    try {
      const allUser = await userRepo.find({});
      event.returnValue = allUser;
      console.log('ALL USERS', allUser);
      return;
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('db:user:add', async (event: any, user: SocialUser) => {
    if (!user) return;
    try {
      const foundUser = await userRepo.findOne({
        where: { id: user.id },
        relations: { setting: true },
      });
      console.log('FOUND', foundUser);
      if (foundUser) {
        event.returnValue = foundUser;
        return event;
      } else {
        event.returnValue = await userRepo.insert(user);
        console.log('INSERT', event.returnValue);
      }
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on(
    'db:setting:update',
    async (
      event: any,
      { userId, setting }: { userId: string; setting: AppState['setting'] }
    ) => {
      console.log('DB:SETTING:UPDATE', userId, setting);
      if (!setting) return;
      try {
        const foundUser = await userRepo.findOne({ where: { id: userId } });
        console.log('FOUND', foundUser);
        if (foundUser) {
          const updatedSettings = await settingRepo.save(setting);
          console.log('SETTING SAVED', updatedSettings);
          foundUser.setting = updatedSettings;
          await userRepo.save(foundUser);
          console.log('USER UDPATED');
          event.returnValue = foundUser;
        } else {
          event.returnValue = null;
          console.log('INSERT', event.returnValue);
        }
      } catch (err) {
        throw err;
      }
    }
  );

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false, // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
