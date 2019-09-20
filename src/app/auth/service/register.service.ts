import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  currentID: any;
  badge: any;
  registerStage: any;
  private login: any;
  private code: any;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any) {}

  getRegisterStage() {
    return this.localStorage.get('registerStage', 'vpotoke');
  }

  getRegisterId() {
    return this.localStorage.get('id', 'vpotoke');
  }

  setRegisterData(data: any) {
    this.localStorage.set('id', `${data.id}`, 'vpotoke');
    this.localStorage.set('registerStage', `${data.registerStage}`, 'vpotoke');
  }

  setLogin(login: any) {
    this.login = login;
    this.localStorage.set('id', login, 'vpotoke');
  }

  getLogin() {
    return this.login;
  }

  setCode(code: any) {
    this.code = code;
  }

  getCode() {
    return this.code;
  }


}
