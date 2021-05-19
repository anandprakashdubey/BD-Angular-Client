import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { BatchModule } from './BatchProcess/batch.module';
import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: HomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
    BatchModule,
    NgxSpinnerModule  
  ],
  providers: [NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
