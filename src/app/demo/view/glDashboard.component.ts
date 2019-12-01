import {Component, OnInit} from '@angular/core';
import {GlService} from '../service/glService';
@Component({
    templateUrl: './glDashboard.component.html'
})
export class GlDashboardComponent implements OnInit {

    lineData: any;
    mainData: any;
    pieData: any;
    nestedPieChart: any;
    data: any;
    constructor(private glService: GlService){}
    selectData(e: any){
        console.log(e.dataset);
        console.log(e.element);
        console.log(e.element._datasetIndex);
        console.log(e.element._index);
        this.nestedPieChart = this.createDataCharts(this.mainData,2,e.element._model.label)
    }
    createDataCharts(data, level=1, allowedVal =''){
        const labelsHead = [];
        const dataVal = [];
        for (let i = 0; i < data.length; i++) {
            if(level===1) {
            if (labelsHead.indexOf(data[i].itemName) === -1) {
                labelsHead.push(data[i].itemName);
                dataVal.push(data[i].quantity);
            } else {
                dataVal[labelsHead.indexOf(data[i].itemName)] += data[i].quantity;
            }
        }
        else if(level===2 && allowedVal== data[i].itemName)
        {
            if (labelsHead.indexOf(data[i].subCategory) === -1) {
                labelsHead.push(data[i].subCategory);
                dataVal.push(data[i].quantity);
            } else {
                dataVal[labelsHead.indexOf(data[i].subCategory)] += data[i].quantity;
            }
        }
        }
        return {
            labels: labelsHead,
            datasets: [
                {
                    data: dataVal,
                    backgroundColor: [
                        '#FFC107',
                        '#03A9F4',
                        '#4CAF50'
                    ],
                    hoverBackgroundColor: [
                        '#FFE082',
                        '#81D4FA',
                        '#A5D6A7'
                    ]
                }]
            };
    }
    ngOnInit() {
        this.glService.getStationaryInfo().then(
            (cars) => {
                this.mainData = cars;
                console.log('res data');
                this.pieData = this.createDataCharts(cars);

            }
            );
        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#03A9F4'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#FFC107'
                }
            ]
        };

    }
}
