import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class GlService {
     Url = 'http://18.219.190.56:9000/';
    constructor(private http: Http) {}

    getStationaryInfo() {
        return this.http.get(`${this.Url}inventory/details`)
                    .toPromise()
                    .then(res => <any> res.json().result_set)
    }
}
