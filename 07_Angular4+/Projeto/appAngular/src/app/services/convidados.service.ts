import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { IConvidado } from "../interfaces/convidado.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class ConvidadosService{

    private url: string = "http://localhost:3200/eventos/";

    constructor(private _http: Http){

    }

    public getConvidadosByIdEvento(idEvento: string) : Observable<Array<IConvidado>>{
        return this._http.get(`${this.url}${idEvento}/convidados`).map(res => res.json());
    }

    public addConvidados(convidado: IConvidado) : Observable<Array<IConvidado>>{
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: header });

        let json = JSON.stringify(
            {
                nome: convidado.nome,
                email: convidado.email,
                cpf: convidado.cpf,
            }
        )

        return this._http.post(`${this.url}${convidado.idEvento}/convidados`, json, options)
            .map(res => res.json());
    }

}