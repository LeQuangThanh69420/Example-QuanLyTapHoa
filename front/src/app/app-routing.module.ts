import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFrameComponent } from './login-frame/login-frame.component';
import { HomeComponent } from './home/home.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuard]},
  { path: "**", component: HomeComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
