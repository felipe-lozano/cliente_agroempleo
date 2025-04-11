import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/pages/login/login.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './app/pages/register/register.component';
import { HomeComponent } from './app/pages/home/home.component';
import { RecuperarComponent } from './app/pages/recuperar/recuperar.component';

bootstrapApplication(AppComponent,{
    providers:[
        provideRouter([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent,
                children:[
                    {
                        path: 'recuperar',component: RecuperarComponent
                    },
                ]
            
            },
            { path: 'register',component: RegisterComponent},
            { path: 'home', component: HomeComponent},
            {path: 'recuperar', component: RecuperarComponent}
           

  
          ]),
        provideAnimations(),
        provideHttpClient()
    ]
}).catch(err => console.error(err));