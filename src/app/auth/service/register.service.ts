import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  currentID;
  badge;
  registerStage;
  private login;
  private code;

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  getRegisterStage() {
    return this.localStorageService.get('registerStage', 'vpotoke');
  }

  getRegisterId() {
    return this.localStorageService.get('id', 'vpotoke');
  }

  setRegisterData(data) {
    this.localStorageService.set('id', `${data.id}`, 'vpotoke');
    this.localStorageService.set('registerStage', `${data.registerStage}`, 'vpotoke');
  }

  setLogin(login) {
    this.login = login;
    this.localStorageService.set('id', login, 'vpotoke');
  }

  getLogin() {
    return this.login;
  }

  setCode(code) {
    this.code = code;
  }

  getCode() {
    return this.code;
  }


}
