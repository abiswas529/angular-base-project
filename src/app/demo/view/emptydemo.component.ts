import { Component, OnInit } from '@angular/core';
//import { CountryService } from '../service/countryservice';
import { AssignService } from '../service/assignService';
import { SelectItem, MenuItem } from 'primeng/primeng';
import { AssignList } from '../domain/assignList';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent implements OnInit {
    itemCategory: SelectItem[];
    itemList: AssignList[];
    currentEmployee: any;
    currentEmployeeObj: {
        id: Number,
        empID: any,
        name: any,
        email: any,
        phone: any
    };
    enteredId: any;
    isValidOtp: Boolean;
    toValidOtp: any;
    itemCategoryListbox: SelectItem[];
    showEmployeeDetails: Boolean;
    itemSubCategory: SelectItem[];
    display: boolean;
    itemSubCategoryListbox: SelectItem[];

    constructor(private assignService: AssignService, private fb: FormBuilder) { }
    productForm: FormGroup;
    ngOnInit() {
        this.showEmployeeDetails = false;
        this.isValidOtp = false;
        this.itemCategory = [];
        this.itemCategory.push({ label: 'Select Category', value: 0 });
        this.itemCategory.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.itemCategory.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.itemCategory.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.itemCategory.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.itemCategory.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

        this.itemCategoryListbox = this.itemCategory.slice(1);

        this.itemSubCategory = [];
        this.itemSubCategory.push({ label: 'Select Sub Category', value: 0 });
        this.itemSubCategory.push({ label: 'Pen', value: '1' });
        this.itemSubCategory.push({ label: 'Marker', value: '2' });
        this.itemSubCategory.push({ label: 'Pencil', value: '3' });
        this.itemSubCategory.push({ label: 'Duster', value: '4' });
        this.itemSubCategory.push({ label: 'Copy', value: '5' });

        this.itemSubCategoryListbox = this.itemSubCategory.slice(1);

        /* Initiate the form structure */
        this.productForm = this.fb.group({
            selling_points: this.fb.array([this.fb.group({ category: '', itemCode: '', quantity: '', note: '' })])
        })

    }
    get sellingPoints() {
        return this.productForm.get('selling_points') as FormArray;
    }
    sendOtp() {
        let getotpObj = this.currentEmployeeObj;
        let creatOtpObj = {
            empId: getotpObj.empID,
            //phoneNo: getotpObj.phone,
            phoneNo: getotpObj.phone,
            name: getotpObj.name
        }
        this.assignService.sendOtp(creatOtpObj);
        this.display = true;
    }
    validateOtp() {
        let getotpObj = this.currentEmployeeObj;
        let validatedOtp = this.toValidOtp;

        let validateOtpObj = {
            empId: getotpObj.empID,
            otpnum: validatedOtp
        }
        this.assignService.validOtp(validateOtpObj).then(res => {
            if (res.status == 200) {
                this.display = false;
                this.isValidOtp = true;
            }
        });

    }

    addSellingPoint() {
        this.sellingPoints.push(this.fb.group({ category: '', itemCode: '', quantity: '', note: '' }));
    }
    deleteSellingPoint(index) {
        this.sellingPoints.removeAt(index);
    }
    clearFormArray() {
        this.sellingPoints.reset();
        while (this.sellingPoints.length !== 0) {
            this.sellingPoints.removeAt(0)
        }
        this.isValidOtp = false;
    }
    searchEmployee() {
        this.assignService.getEmployeeData(this.enteredId).then(res => {
            if (res.status == 1) {
                this.currentEmployee = this.enteredId; this.currentEmployeeObj = res.result_set; this.showEmployeeDetails = true; let employeeObj = this.currentEmployee;
                this.assignService.fetchEmployeeHistory(employeeObj).then(itemList => this.itemList = itemList);
            } else {
                alert('NotFound'); this.showEmployeeDetails = false
            }
        });;
    }
    saveAssignListDetails() {
        let comObj = this.productForm.value.selling_points;
        let createObj = [];
        comObj.forEach(element => {
            let newPush = {
                empID: this.currentEmployee,
                itemCode: element.itemCode,
                note: element.note,
                quantity: element.quantity
            }
            createObj.push(newPush);
        });
        this.assignService.saveAssignDetails(createObj).then(res => {
            if (res.status == 1) {
                let employeeObj = this.currentEmployee;
                this.assignService.fetchEmployeeHistory(employeeObj).then(itemList => this.itemList = itemList);
            }
        });
    }
}
