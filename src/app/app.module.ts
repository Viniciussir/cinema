import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AccordionModule} from 'primeng/accordion';             
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {SplitterModule} from 'primeng/splitter';
import { InputTextModule } from 'primeng/inputtext';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { InputMaskModule } from "primeng/inputmask";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {PasswordModule} from 'primeng/password';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RippleModule} from 'primeng/ripple';
import { MenuComponent } from './menu/menu.component';

import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProductService } from './menu/servico/menu.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AccordionModule,
    CardModule,
    DividerModule,
    ButtonModule,
    SplitterModule,
    ChipsModule,
    AutoCompleteModule,
    HttpClientModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    TableModule,
    ToastModule,
    SliderModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    ConfirmDialogModule,
    RouterModule,
  ],
  providers: [ProductService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
