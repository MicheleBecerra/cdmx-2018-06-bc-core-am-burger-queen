import {Component, OnInit} from '@angular/core';

@Component ({
    // tslint:disable-next-line:component-selector
    selector: 'register',
    templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Registrate' ;
    }
    ngOnInit() {
        console.log('Componente de registro cargado ...');
    }
}
