import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; 
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LearningComponent } from './pages/learning/learning.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '', component: RegisterComponent},
    {path: '', component: HomeComponent},
    {path: '', component: LearningComponent},

];