import { Component, OnInit } from '@angular/core';
//import { CountryService } from '../service/countryservice';
import { SelectItem, MenuItem } from 'primeng/primeng';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent implements OnInit {
    itemCategory: SelectItem[];

    itemCategoryListbox: SelectItem[];

    itemSubCategory: SelectItem[];

    itemSubCategoryListbox: SelectItem[];

    constructor(private fb: FormBuilder) { }
    productForm: FormGroup;
    ngOnInit() {
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
        this.itemSubCategory.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.itemSubCategory.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.itemSubCategory.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.itemSubCategory.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.itemSubCategory.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

        this.itemSubCategoryListbox = this.itemSubCategory.slice(1);

        /* Initiate the form structure */
        this.productForm = this.fb.group({
            selling_points: this.fb.array([this.fb.group({ category: '', subcategory: '', quantity: '', expln: '' })])
        })
    }
    get sellingPoints() {
        return this.productForm.get('selling_points') as FormArray;
    }
    addSellingPoint() {
        this.sellingPoints.push(this.fb.group({ category: '', subcategory: '', quantity: '', expln: '' }));
    }

    deleteSellingPoint(index) {
        this.sellingPoints.removeAt(index);
    }
}
