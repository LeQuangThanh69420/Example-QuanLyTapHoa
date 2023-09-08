import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFrameComponent } from './login-frame/login-frame.component';
import { SignupFrameComponent } from './signup-frame/signup-frame.component';
import { HomeComponent } from './home/home.component';
import { WorkSpaceComponent } from './work-space/work-space.component';
import { WorkTableComponent } from './work-space/work-bar/work-table/work-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupFrameComponent },
  { path: 'workspace', component: WorkSpaceComponent, 
    children: [
      { path: ':categoryId', component: WorkTableComponent,},
    ],
  },
  { path: "**", component: HomeComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
