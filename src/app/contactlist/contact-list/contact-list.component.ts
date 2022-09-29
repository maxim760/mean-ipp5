import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ServiceAPI } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ServiceAPI]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null
  constructor(private contactService: ServiceAPI) { }
  ngOnInit() {
    this.contactService
      .getContacts()
      .subscribe((contacts) => {
        this.contacts = contacts.map(item => {
          return {
            ...item,
            telephone: {
              home: item?.telephone?.home || "",
              mobile: item?.telephone?.mobile || ""
            }
          }
        })
      })
  }
  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => contact._id === contactId);
  }
  selectContact(contact: Contact | null) {
    this.selectedContact = contact
  }
  createNewContact() {
    const contact: Contact = {
      username: '',
      email: '',
      telephone: {
        home: '',
        mobile: ''
      }
    }
    this.selectContact(contact)
  }
  deleteContact = (id: string) => {
    const idx = this.getIndexOfContact(id);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts
  }
  addContact = (contact: Contact) => {
    this.contacts.push(contact)
    this.selectContact(contact)
    return this.contacts
  }
  updateContact = (contact: Contact) => {
    const idx = this.getIndexOfContact(contact._id || "");
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts
  }
}
