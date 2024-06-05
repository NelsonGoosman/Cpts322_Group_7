import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DataEntryComponent } from './data-entry/data-entry.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'data-entry', component: DataEntryComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];
