import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {
    titulo_home: string = "Home";
    titulo_empresa: string = "Impacta";
    titulo_principal: string = "Gestão de Eventos";
    titulo_convidados: string = "Gestão de Convidados";
}