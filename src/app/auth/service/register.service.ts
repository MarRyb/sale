import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  currentID: any;
  badge: any;
  registerStage: any;
  private login: any;
  private code: any;

  constructor() {}

  getRegisterStage() {
    return localStorage.get('registerStage', 'vpotoke');
  }

  getRegisterId() {
    return localStorage.get('id', 'vpotoke');
  }

  setRegisterData(data: any) {
    localStorage.set('id', `${data.id}`, 'vpotoke');
    localStorage.set('registerStage', `${data.registerStage}`, 'vpotoke');
  }

  setLogin(login: any) {
    this.login = login;
    localStorage.set('id', login, 'vpotoke');
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
