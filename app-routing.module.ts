import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';
import { CheckoutSummaryComponent } from 'src/app/checkout-summary/checkout-summary.component';


const routes: Routes = [
  {path: '', redirectTo: '/checkout', pathMatch: 'full'}, 
  // Please change this to which ever component you are testing and implementing
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkout-summary', component: CheckoutSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
