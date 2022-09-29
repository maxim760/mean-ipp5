import { Injectable } from '@angular/core';
import {Contact} from "./contact"
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPI {
  private contactsUrl = '/api/contacts'; // путь для сервиса
  constructor(private http: HttpClient) { }

  // создание нового контакта
  public createContact(newContact: Contact): Observable<Contact> {
    return this.http.post(this.contactsUrl, newContact) as Observable<Contact>
  }
  public getContacts(): Observable<Contact[]> {
    return this.http.get(this.contactsUrl) as Observable<Contact[]>
  }
  public getContact(id: String): Observable<Contact> {
    return this.http.get(this.contactsUrl + "/" + id) as Observable<Contact>
  }
  public deleteContact(delContactId: String) {
    return this.http.delete(this.contactsUrl + '/' + delContactId) as Observable<String>
  }
  public updateContact(putContact: Contact) {
    var putUrl = this.contactsUrl + '/' + putContact._id;
    return this.http.put(putUrl, putContact) as Observable<Contact>
  }
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} – ${error.statusText}` : 'Ошибка сервера';
    console.error(errMsg); // Вывод сообщения в консоль браузера
  }
}
