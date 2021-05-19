import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class BatchService {
    private batchURL = 'http://localhost:50947/api/batchprocess'
    constructor(private http: HttpClient) {

    }
    startProcess(postObject): Observable<number> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<number>(`${this.batchURL}/StartProcess`, postObject, { headers })
        .pipe(
          tap(data => console.log('createProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    checkStatus(processID): Observable<any[]> {
        return this.http.get<any[]>(`${this.batchURL}/CheckStatus?id=${processID}`)
        .pipe(             
            catchError(this.handleError)
        );
    }

    ViewDetail(processID, batchID): Observable<any> {
        return this.http.get<any>(`${this.batchURL}/ViewDetail?id=${processID}&batchID=${batchID}`)
        .pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

     

    private handleError(err: HttpErrorResponse) {        
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {             
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {            
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}