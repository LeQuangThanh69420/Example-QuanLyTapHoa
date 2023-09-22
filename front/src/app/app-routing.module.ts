import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFrameComponent } from './login-frame/login-frame.component';
import { SignupFrameComponent } from './signup-frame/signup-frame.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './work/category/category.component';
import { ProductComponent } from './work/category/product/product.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupFrameComponent },
  {
    path: 'work', component: WorkComponent,
    children: [
      {
        path: 'category', component: CategoryComponent,
        children: [
          { path: '', redirectTo: '1', pathMatch: 'full' },
          { path: ':categoryId', component: ProductComponent, },
        ],
      },
    ],
  },
  { path: "**", component: HomeComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
