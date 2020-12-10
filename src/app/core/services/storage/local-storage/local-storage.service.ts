import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  authProviderTokenName = 'auth.provider';
  constructor() { }

  setItem(key: string, storageObject: any, stringify = true): void {
    localStorage.setItem(key, stringify ? JSON.stringify(storageObject) : storageObject);
  }

  getItem(key: string, parse = true): any {
    const item = localStorage.getItem(key);
    return parse ? JSON.parse(item) : item;
  }

  clear(): void {
    localStorage.clear();
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  updateAuthProvider(provider: string): void {
    this.setItem(this.authProviderTokenName, provider, false);
  }

  getAuthProvider(): string {
    return this.getItem(this.authProviderTokenName, false);
  }

  removeAuthProvider(): void {
    localStorage.removeItem(this.authProviderTokenName);
  }

}
