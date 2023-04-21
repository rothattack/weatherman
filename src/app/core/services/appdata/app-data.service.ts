import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { first, of } from 'rxjs';
import { AppState } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  constructor(private electronService: ElectronService) {
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  updateUser(user: SocialUser) {
    if (this.electronService.isElectron) {
      return of(this.electronService.ipcRenderer.sendSync('db:user:add', user));
    }
  }

  updateSettings(userId: string, setting: AppState['setting']) {
    if (this.electronService.isElectron) {
      return of(
        this.electronService.ipcRenderer.sendSync('db:setting:update', {
          userId,
          setting,
        })
      );
    }
  }
}
