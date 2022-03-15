import { Injectable } from '@angular/core';
import { Partner } from './heroes/partner'; 
import { PARTNERS } from './heroes/new-partners';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService)
    { }

  private partnersUrl = 'api/partners';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPartners(): Observable<Partner[]> {
    this.messageService.add('PartnerService: socios recuperados');
    return this.http.get<Partner[]>(this.partnersUrl)
    .pipe(
      tap(_ => this.log('socios recuperados')),
      catchError(this.handleError<Partner[]>('getPartners', []))
    );
  }

  getPartner(id: number): Observable<Partner> {
    const url = `${this.partnersUrl}/${id}`;
    return this.http.get<Partner>(url)
    .pipe(
      tap(_ => this.log(`Socio recuperado N°${id}`)),
      catchError(this.handleError<Partner>(`getPartner id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updatePartner(partner: Partner): Observable<any> {
    return this.http.put(this.partnersUrl, partner, this.httpOptions).
    pipe(
      tap(_ => this.log(`updated partner id=${partner.id}`)),
      catchError(this.handleError<any>('updatePartner'))
    );
  }

  addPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(this.partnersUrl, partner, this.httpOptions).pipe(
      tap((newPartner: Partner) => this.log(`added partner w/ id=${newPartner.id}`)),
      catchError(this.handleError<Partner>('addPartner'))
    );
  }

  deletePartner(id: number): Observable<Partner> {
    const url = `${this.partnersUrl}/${id}`;
    return this.http.delete<Partner>(url, this.httpOptions).
    pipe(
      tap(_ => this.log(`deleted Partner id=${id}`)),
      catchError(this.handleError<Partner>('deletedPartner'))
    );
  }

  searchPartners(term: string): Observable<Partner[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Partner[]>(`${this.partnersUrl}/?name=${term}`).
    pipe(
      tap(x => x.length ?
         this.log(`found partners matching "${term}"`) :
         this.log(`no partners matching "${term}"`)),
      catchError(this.handleError<Partner[]>('searchPartners', []))
    );
  }
}