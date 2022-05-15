import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ListOrderComponent } from './orders/list-order/list-order.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path :'',redirectTo:'login',pathMatch:'full'},
  {path :'login',component:LoginComponent},
  {path :'order',component:ListOrderComponent,
   canActivate:[AuthGuard]},
  {path:'signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
