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
                console.log(response.user);
            },
            error => {
            const errorMensaje = <any>error;
            console.log(errorMensaje);

            if (errorMensaje != null) {
            this.status = 'error';
                }
            }
        );
        alert(this.user.email);
        alert(this.user.password);
        console.log(this.user);
    }
}
