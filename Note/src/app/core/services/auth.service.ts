import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  name: string = '';
  token: string = '';
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.data();
  }

  register(form: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'register', form);
  }

  login(form: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'login', form);
  }

  data(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const userToken = jwtDecode(token);
      this.userData.next(userToken);
      this._Router.navigate(['/home']);
      this.token = localStorage.getItem('token')!;
      this.name = localStorage.getItem('name')!;
    }
  }

  logOut(): void {
    localStorage.clear();
    this._Router.navigate(['/login']);
    this.token = '';
    this.name = '';
  }

  addNote(form: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'addNote', form);
  }

  allNote(notes: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'allNote', { notes });
  }

  delNote(body: object): Observable<any> {
    return this._HttpClient.delete(environment.baseUrl + 'delNote', {
      body,
    });
  }

  updateNote(form: object, id: string): Observable<any> {
    return this._HttpClient.patch(environment.baseUrl + 'updateNote', {
      form,
      id,
    });
  }
}
