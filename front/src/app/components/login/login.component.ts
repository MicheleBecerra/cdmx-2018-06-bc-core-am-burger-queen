import {Component, OnInit} from '@angular/core';

@Component ({
    // tslint:disable-next-line:component-selector
    selector: 'login',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Identificate' ;
    }
    ngOnInit() {
        console.log('Componente de login cargado ...');
    }
}
