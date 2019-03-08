import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CadastroComponent } from '../components/cadastro/cadastro.component';
import { NotFoundComponent } from '../components/error/notFound.component';
import { ConvidadosComponent } from '../components/convidados/convidados.component';

export const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "eventos", component: CadastroComponent },
    { path: "home", component: HomeComponent },
    { path: "convidados", component: ConvidadosComponent },
    { path: "**", component: NotFoundComponent }
];