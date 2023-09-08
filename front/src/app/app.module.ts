import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFrameComponent } from './login-frame/login-frame.component';
import { SignupFrameComponent } from './signup-frame/signup-frame.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { WorkSpaceComponent } from './work-space/work-space.component';
import { WorkBarComponent } from './work-space/work-bar/work-bar.component';
import { WorkTableComponent } from './work-space/work-bar/work-table/work-table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFrameComponent,
    SignupFrameComponent,
    HomeComponent,
    WorkSpaceComponent,
    WorkBarComponent,
    WorkTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
