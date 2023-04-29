import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { OwnerModule } from './owner/owner.module';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './cart/delete/delete.component';
import { FooterComponent } from './footer/footer.component';

// import { JWT_OPTIONS, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

// const jwtOptions: JwtModuleOptions = {
//   config: {
//     tokenGetter: () => {
//       return localStorage.getItem('token');
//     },
//     allowedDomains: ['example.com', 'localhost:3000', 'localhost:4200'],
//     disallowedRoutes: ['example.com/api/auth/login'],
//   },
// };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    AboutComponent,
    InternalServerComponent,
    DeleteComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    OwnerModule,
    ReactiveFormsModule,
    // JwtModule.forRoot({
    //   jwtOptionsProvider: {
    //     provide: JWT_OPTIONS,
    //     useFactory: () => jwtOptions
    //   }
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
