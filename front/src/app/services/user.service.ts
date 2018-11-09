import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService {
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    register(user: User): Observable<any> {
        let params = JSON.stringify(user);
        // configuramos las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        console.log(headers);

        return this._http.post(this.url + 'register', params, {headers: headers});
    }
}
