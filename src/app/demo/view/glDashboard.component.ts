import { Component, OnInit } from '@angular/core';
import { GlService } from '../service/glService';

@Component({
    templateUrl: './glDashboard.component.html'
})
export class GlDashboardComponent implements OnInit {

    lineData: any;
    mainData: any;
    pieData: any;
    itemCode: any;
    nestedPieChart: any;
    data: any;
    constructor(private glService: GlService) { }
    selectData(e: any) {
        console.log(e.dataset);
        console.log(e.element);
        console.log(e.element._datasetIndex);
        console.log(e.element._index);
        this.nestedPieChart = this.createDataCharts(this.mainData, 2, e.element._model.label)
    }
    createDataCharts(data, level = 1, allowedVal = '') {
        const labelsHead = [];
        const dataVal = [];
        const itemCodeMap = new Map();
        for (let i = 0; i < data.length; i++) {
            itemCodeMap.set(data[i].itemCode,data[i].subCategory)
            if (level === 1) {
                if (labelsHead.indexOf(data[i].itemName) === -1) {
                    labelsHead.push(data[i].itemName);
                    dataVal.push(data[i].quantity);
                } else {
                    dataVal[labelsHead.indexOf(data[i].itemName)] += data[i].quantity;
                }
            }
            else if (level === 2 && allowedVal == data[i].itemName) {
                if (labelsHead.indexOf(data[i].subCategory) === -1) {
                    labelsHead.push(data[i].subCategory);
                    dataVal.push(data[i].quantity);
                } else {
                    dataVal[labelsHead.indexOf(data[i].subCategory)] += data[i].quantity;
                }
            }
        }
        this.itemCode = itemCodeMap;
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
    createLineCharts(data) { 
        const labelsHead = [];
        const dataVal = [];
        let dataMap = new Map();
        const mL = 
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (let i = 0; i < data.length; i++) {
            let valm = (new Date(data[i].stationaryDate)).getMonth();
            labelsHead.push(mL[valm]);
            let val=[]
            if(dataMap.has(this.itemCode.get(data[i].itemCode))){
                val = dataMap.get(this.itemCode.get(data[i].itemCode));
            } else {
            val=[0,0,0,0,0,0,0,0,0,0,0,0];
            }
            val[valm] += data[i].quantity;
            dataMap.set(this.itemCode.get(data[i].itemCode),val);
            //alert(valm+mL[valm]+'-'+this.itemCode.get(data[i].itemCode)+data[i].quantity)
            //console.log("ampA",dataMap);
        }
        // console.log("amp",dataMap);
        dataMap.forEach((value, key) => {
            const newOb =  {
                label: key,
                data: value,
                fill: false,
                borderColor: '#03A9F4'
            };
            dataVal.push(newOb);
            console.log(key, value);
        });
        return {
            labels: mL,
            datasets: dataVal
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
        this.glService.getStatInfo().then(
            (cars) => {
                this.mainData = cars;
                console.log('res data');
                this.lineData = this.createLineCharts(cars);

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
