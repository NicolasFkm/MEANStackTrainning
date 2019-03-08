import { Component } from "@angular/core";
import { EventosService } from "../../services/eventos.service";
import { IEvento } from '../../interfaces/evento.interface';
import { IConvidado } from "../../interfaces/convidado.interface";
import { ConvidadosService } from "../../services/convidados.service";

@Component({
    moduleId: module.id,
    templateUrl: 'convidados.component.html'
})
export class ConvidadosComponent {

    public eventos: Array<IEvento>;
    public selectedValue: string;
    public convidados: Array<IConvidado> = [];
    public convidado: IConvidado = {
        'nome': '',
        'email': '',
        'idEvento': '',
        'cpf': ''
    };

    constructor(public evtService: EventosService, public convdService: ConvidadosService) {

        this.listaEventos();

    }

    public listaEventos() {
        this.evtService.getEventosWS().subscribe(res => {

            this.eventos = res;
            for (let index = 0; index < this.eventos.length; index++) {
                let element = this.eventos[index]['data'];
                let data = element.split("T");
                this.eventos[index]['data'] = data[0];

            }

        });
    }

    public listaConvidados(idEvento: string) {
        this.selectedValue = idEvento;
        this.convdService.getConvidadosByIdEvento(idEvento).subscribe(res => {
            this.convidados = res;
        })
    }


    public adicionarConvidado() {
        this.convidado.idEvento = this.selectedValue;
        this.convdService.addConvidados(this.convidado)
            .subscribe(res => JSON.stringify(res),
                error => alert(error),
                () => this.listaConvidados(this.selectedValue));
    }
}