import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {
    
    getCursos() {
        return [
            'JavaScript', 
            'Massoterapia', 
            'Scrum', 
            'Spring Boot', 
            'PHP',
            'SQL'
        ];
    }

}