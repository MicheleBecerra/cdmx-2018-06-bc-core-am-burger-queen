import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component ({
    // tslint:disable-next-line:component-selector
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Identificate' ;
        this.user = new User('', '', 'Cajer@',  '', '', '' );
    }
    ngOnInit() {
        console.log('Componente de login cargado ...');
    }
    onSubmit() {
        // Conseguir datos depues de logear al usuario
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                console.log('1 ', this.identity);

                if (!this.identity || !this.identity._id) {
                    this.status = 'error';
                } else {
                    this.status = "success";

                    // persistencia de los datos del usuario
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    // Obtener token
                    this.getToken();
                }
            },
            error => {
            const errorMensaje = <any>error;
            console.log(errorMensaje);

            if (errorMensaje != null) {
            this.status = 'error';
                }
            }
        );

        console.log(this.user);
    }

    getToken() {
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                console.log('2 ', this.token);

                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    this.status = 'success' ;

                    // persistencia del token del usuario
                    localStorage.setItem('token', this.token );
                    // Obtener los contadores o estadisticos del usuario
                }
            },
            error => {
            const errorMensaje = <any>error;
            console.log(errorMensaje);

            if (errorMensaje != null) {
            this.status = 'error';
                }
            }
        );

    }
}
