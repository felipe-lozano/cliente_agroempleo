import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; 
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LearningComponent } from './pages/learning/learning.component';
import { PostulacionComponent } from './pages/postulacion/postulacion.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { BibliotecaComponent } from './pages/biblioteca/biblioteca.component';


export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: '', component: RegisterComponent},
    {path: '', component: HomeComponent},
    {path: '', component: LearningComponent},
    {path: '', component: PostulacionComponent},
    {path: '', component: PerfilComponent},
    {path: '', component: BibliotecaComponent},

];