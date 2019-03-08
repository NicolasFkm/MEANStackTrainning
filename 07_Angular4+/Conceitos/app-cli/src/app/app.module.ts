import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExemploComponent } from './components/exemplo/exemplo.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursosService } from './services/cursos.service';

@NgModule({
  declarations: [
    AppComponent,
    ExemploComponent,
    CursosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
