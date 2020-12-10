import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, storageObject: any): void {
    sessionStorage.setItem(key, JSON.stringify(storageObject));
  }

  getItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  clear(): void {
    sessionStorage.clear();
  }

  removeItem(key: string): void{
    sessionStorage.removeItem(key);
  }
}
