import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AssignSucces } from '../domain/assignSuccess';

@Injectable()
export class AssignService {
    Url = 'http://18.219.190.56:9000/';
    constructor(private http: Http) { }
    saveAssignDetails(param) {
        return this.http.post(`${this.Url}employees/history`, param)
            .toPromise()
            .then(res => <any>res.json())
    }
    fetchEmployeeHistory(param) {
        return this.http.get(`${this.Url}employees/history/` + param)
            .toPromise()
            .then(res => <any>res.json().result_set)
    }
    getEmployeeData(param) {
        return this.http.get(`${this.Url}employees/` + param)
            .toPromise()
            .then(res => <any>res.json())
    }
    sendOtp(param) {
        return this.http.get(`${this.Url}generateOtp?empId=` + param.empId + '&phoneNo=' + param.phoneNo + '&name=' + param.name)
            .toPromise()
    }
    validOtp(param) {
        return this.http.get(`${this.Url}validateOtp/?empId=` + param.empId + '&otpnum=' + param.otpnum)
            .toPromise().then(res => res)
    }
}
