import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from '../../services/batch.service';

import { NgxSpinnerService } from "ngx-spinner";
 

@Component({
    selector: "app-batch-detail",
    templateUrl: "./batch.component.html",
    styleUrls: ["./batch.component.css"],
})
export class BatchComponent implements OnInit {
    pageTitle: string = "Batch Details";   
    apiResponse = [];
    batchID: number;
    currentBatch: number;
    

    constructor(private batchService: BatchService,
        private spinner: NgxSpinnerService,
        private activateRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
       this.spinner.show();
      
       this.batchID = +this.activateRoute.snapshot.paramMap.get('batchID');
       this.currentBatch = +this.activateRoute.snapshot.paramMap.get('currentBatch');      
       this.loadBatchDetails();
    }

    
    loadBatchDetails() {
        this.batchService.ViewDetail(this.batchID, this.currentBatch)
        .subscribe({
            next: (data) => {
                this.apiResponse = data;
                this.spinner.hide();
            },
            error: err => { console.log(err); },
            complete: () => {this.spinner.hide();}
        });
    }
}