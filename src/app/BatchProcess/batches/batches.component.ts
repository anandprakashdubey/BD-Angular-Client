import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { BatchService } from '../../services/batch.service';

import { NgxSpinnerService } from "ngx-spinner";
 

@Component({
    selector: "app-batches",
    templateUrl: "./batches.component.html",
    styleUrls: ["./batches.component.css"],
})
export class BatchesComponent implements OnInit {
    pageTitle: string = "Batches";
    batchForm: FormGroup;
    pendingBatch: number = 0;
    totalBatchSum: number = 0;
    createdBatchID: number = 0; 
    apiResponse = [];
    isPending: boolean = false;
    searchEventSubscription:any;

    constructor(private fb: FormBuilder,
        private batchService: BatchService,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.batchForm = this.fb.group({
          X: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
          Y: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
        });
    }

    save() {
        this.apiResponse = [];
        this.isPending = true;   
        this.pendingBatch = this.batchForm.value['X'];
        this.spinner.show();       
        this.batchService.startProcess(this.batchForm.value).subscribe({
            next: data => {
                this.createdBatchID = data;
                this.batchForm.reset();     
                this.spinner.hide();             
            },
            error: err => { console.log(err); },            
        });

        setInterval( () => {this.checkStatus()}, 2000);
    }

    isStatusCompleted() {        
        if(!this.isPending) this.searchEventSubscription.unsubscribe();      
        return  this.isPending;
    }

    checkStatus() {       
        this.spinner.show();    
        this.searchEventSubscription  =  interval(2000)
            .pipe(takeWhile(() => this.isStatusCompleted()))
            .subscribe(() => {    
                this.batchService.checkStatus(this.createdBatchID)
                .subscribe({
                    next: data => {      
                        if(data.length && data[0].batches) {
                            this.apiResponse = data[0].batches;
                            this.isPending = this.apiResponse.find(item => item.remainingBatch === 0 ) ? false : true;
                            this.calculateBatchTotal();                            
                        }
                        this.spinner.hide(); 
                        
                    },
                    error: err => { console.log(err); },
                    complete: () => {}
                });
            });
    }

    calculateBatchTotal() {  
        this.totalBatchSum = 0;      
        this.apiResponse.forEach(item =>{
            this.totalBatchSum += item.sumOfGeneratedNumbers + item.sumOfMultipliedNumbers
        });
        this.pendingBatch = this.apiResponse.sort((a,b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated))[0].remainingBatch
    }

}