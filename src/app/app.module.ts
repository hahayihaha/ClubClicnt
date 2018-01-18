import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { AdminComponent } from './admin/admin.component';
import { HttpModule } from "@angular/http";
import { LoginComponent } from './login/login.component';
import { ModifyComponent } from './modify/modify.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from "./auth.guard.service";

const routers: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent,},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'admin', component: AdminComponent},
      {path: 'add', component: AddComponent},
      {path: 'modify/:id', component: ModifyComponent},
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    AdminComponent,
    LoginComponent,
    ModifyComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
