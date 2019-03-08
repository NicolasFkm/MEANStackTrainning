import { PipeTransform, Pipe } from "@angular/core";
import { IEvento } from "../interfaces/evento.interface";

@Pipe({
    name: 'sublista'
})
export class Sublista implements PipeTransform{
    transform(eventos: Array<IEvento>, input: string): Array<IEvento>{
        return eventos.filter( 
            evento => evento.descricao.toLowerCase().includes(input.toLowerCase())
        );
    }
}