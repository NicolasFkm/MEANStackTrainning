import { Injectable } from '@angular/core';
import { IEvento } from '../interfaces/evento.interface';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class EventosService {
    
    private url: string = "http://localhost:3200/eventos";
    constructor(private _http: Http){

    }

    public getEventosWS():  Observable<Array<IEvento>> {
        return this._http.get(this.url).map(res=>res.json());
    }

    public setEventosWS( evento: IEvento ): Observable<IEvento> {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: header });

        let json = JSON.stringify(
            {
                descricao: evento.descricao,
                data: evento.data,
                preco: evento.preco
            }
        )

        return this._http.post(this.url, json, options)
            .map(res => res.json());
    }
}