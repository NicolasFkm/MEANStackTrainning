import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { NotFoundComponent } from './components/error/notFound.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes/app.routes';
import { EventosService } from './services/eventos.service';
import { Sublista } from './filters/sublista.filter';
import { HttpModule } from '@angular/http';
import { ConvidadosComponent } from './components/convidados/convidados.component';
import { ConvidadosService } from './services/convidados.service';

@NgModule({
    imports:      [ 
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpModule
    ],
    declarations: [ 
        AppComponent,
        MenuComponent,
        HomeComponent,
        CadastroComponent,
        NotFoundComponent,
        Sublista,
        ConvidadosComponent
    ],
    providers: [
        EventosService,
        ConvidadosService
    ],
    bootstrap:    [ 
        AppComponent 
    ]
})
export class AppModule { }
