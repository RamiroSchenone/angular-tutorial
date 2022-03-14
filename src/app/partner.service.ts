import { Injectable } from '@angular/core';
import { Partner } from './heroes/partner'; 
import { PARTNERS } from './heroes/new-partners';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  getPartners(): Observable<Partner[]> {
    const partners = of(PARTNERS);
    this.messageService.add('PartnerService: fetched heroes');
    return partners;
  }
  constructor(private messageService: MessageService) { }
}
