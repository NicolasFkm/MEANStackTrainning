import { Component } from "@angular/core";
import { IEvento } from "../../interfaces/evento.interface";
import { EventosService } from "../../services/eventos.service";

@Component({
    moduleId: module.id,
    templateUrl: `cadastro.component.html`
})
export class CadastroComponent {

    public listaEventos: Array<IEvento>;
    public eventoSelecionado: IEvento;
    private evento: IEvento;

    public novoEvento(): void {
        this.evento = {
            descricao: "",
            data: "",
            preco: 0
        }
        this.eventoSelecionado = this.evento;
    }

    public selecionarEvento(item: IEvento) {
        this.eventoSelecionado = item;
    }

    public adicionarEvento(evento: IEvento) {
        //this.listaEventos.push(evento);
        this.servService.setEventosWS(evento)
            .subscribe(res => JSON.stringify(res),
                error => alert(error),
                () => this.listarEventos());
        alert('Evento incluído com sucesso');
    }

    public listarEventos() {
        this.servService.getEventosWS()
            .subscribe(
                res => {
                    this.listaEventos = res;
                    for (let index = 0; index < this.listaEventos.length; index++) {
                        let element = this.listaEventos[index]['data'];
                        let data = element.split("T");
                        this.listaEventos[index]['data'] = data[0];
                        
                    }
                },
                error => alert(error),
                () => {
                    console.log('Final');

                }

            );
    }

    constructor(public servService: EventosService) {
        this.listarEventos();
    }


}