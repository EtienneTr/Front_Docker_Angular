import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {UploadComponent} from "./pages/upload/upload.component";

import { SecurService } from './services/secur.service';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent, canActivate: [SecurService], data: { role: ['customer', 'admin']} },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [SecurService], data: { role: ['customer', 'admin'] } },
  { path: 'upload', component: UploadComponent,  canActivate: [SecurService], data: { role: ['customer'] }}
];

