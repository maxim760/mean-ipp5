import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import { ServiceAPI } from '../contact.service';
@Component({
selector: 'contact-details',
templateUrl: './contact-details.component.html',
styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
  @Input() contact!: Contact | null;
  @Input() createHandler!: Function;
  @Input() updateHandler!: Function;
  @Input() deleteHandler!: Function;
  constructor(private contactService: ServiceAPI) { }
  createContact(contact: Contact) {
    this.contactService.createContact(contact).subscribe((newContact: Contact) => {
      this.createHandler(newContact);
    })
  }
  updateContact(contact: Contact) {
    this.contactService.updateContact(contact).subscribe((newContact: Contact) => {
      this.updateHandler(newContact);
    })
  }
  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).subscribe((deletedContactId: String) => {
      this.deleteHandler(deletedContactId);
    });
  }
}
