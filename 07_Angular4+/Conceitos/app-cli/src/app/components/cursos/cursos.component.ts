import { Component } from '@angular/core';
import { CursosService } from '../../services/cursos.service';

@Component({
    selector: 'cursos-lista',
    templateUrl: `cursos.component.html`
})
export class CursosComponent{
    cursos: Array<string>;

    constructor(public cursosService: CursosService){
        this.cursos = cursosService.getCursos();
    }
}