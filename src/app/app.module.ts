import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contactlist/contact-details/contact-details.component';
import { ContactListComponent } from './contactlist/contact-list/contact-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
