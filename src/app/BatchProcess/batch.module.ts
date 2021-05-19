import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { BatchesComponent } from './batches/batches.component';
import { BatchComponent } from './batch/batch.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
    declarations: [
        BatchesComponent, 
        BatchComponent   
    ],
    imports: [
      RouterModule.forChild([
        { path: 'batches', component: BatchesComponent },
        { path: 'batch', component: BatchComponent },
        
      ]),
      SharedModule,
      NgxSpinnerModule
    ]
  })
  export class BatchModule { }