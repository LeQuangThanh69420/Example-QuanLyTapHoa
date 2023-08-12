import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFrameComponent } from './login-frame/login-frame.component';
import { SignupFrameComponent } from './signup-frame/signup-frame.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignupFrameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
