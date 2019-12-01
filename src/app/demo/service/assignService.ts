import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AssignSucces } from '../domain/assignSuccess';

@Injectable()
export class AssignService {

    constructor(private http: Http) { }
    saveAssignDetails(param) {
        return this.http.post('http://18.219.190.56:9000/employees/history', param)
            .toPromise()
            .then(res => <any>res.json())
    }
    fetchEmployeeHistory(param) {
        return this.http.get('http://18.219.190.56:9000/employees/history/' + param)
            .toPromise()
            .then(res => <any>res.json().result_set)
    }
    getEmployeeData(param) {
        return this.http.get('http://18.219.190.56:9000/employees/' + param)
            .toPromise()
            .then(res => <any>res.json())
    }
    sendOtp(param) {
        return this.http.get('http://18.219.190.56:9000/generateOtp?empId=' + param.empId + '&phoneNo=' + param.phoneNo + '&name=' + param.name)
            .toPromise()
    }
    validOtp(param) {
        return this.http.get('http://18.219.190.56:9000/validateOtp?empId=' + param.empId + '&otpnum=' + param.otpnum)
            .toPromise().then(res => res)
    }

    // getCarsMedium() {
    //     return this.http.get('assets/demo/data/cars-medium.json')
    //                 .toPromise()
    //                 .then(res => <Car[]> res.json().data)
    //                 .then(data => data);
    // }

    // getCarsLarge() {
    //     return this.http.get('assets/demo/data/cars-large.json')
    //                 .toPromise()
    //                 .then(res => <Car[]> res.json().data)
    //                 .then(data => data);
    // }
}
