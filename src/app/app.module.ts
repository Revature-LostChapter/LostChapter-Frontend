import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatRadioModule} from '@angular/material/radio';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { IndexnavbarComponent } from './indexnavbar/indexnavbar.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { SearchResultsComponent } from './search-results/search-results.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DisplayProductModalComponent } from './display-product-modal/display-product-modal.component';
import { SalesProductComponent } from './sales-product/sales-product.component';
import { AdminFeatureComponent } from './admin-feature/admin-feature.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { NgxSlickJsModule } from 'ngx-slickjs';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IndexnavbarComponent,
    SignupComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent,
    CheckoutSummaryComponent,
    UserProfileComponent,
    SearchResultsComponent,
    HomeComponent,
    DisplayProductModalComponent,
    SalesProductComponent,
    AdminFeatureComponent,
    UpdateBookComponent,
    FeaturedProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDividerModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    NgxPaginationModule,
    FontAwesomeModule,
    MatTabsModule,
    NgxSlickJsModule.forRoot({
      links: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
