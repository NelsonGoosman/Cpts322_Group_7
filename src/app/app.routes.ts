import { Routes } from '@angular/router';
import {HttpClientModule} from'@angular/common/http'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewEntriesComponent } from './view-entries/view-entries.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator' 
import {MatSortModule} from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from './table.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'data-entry', component: DataEntryComponent},
    { path: 'create-account', component: CreateAccountComponent},
    { path: 'view-entries', component: ViewEntriesComponent},
    { path: 'view-reports', component: ViewReportsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];
