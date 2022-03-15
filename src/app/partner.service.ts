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
    this.messageService.add('PartnerService: socios encontrados');
    return partners;
  }
  getPartner(id: number): Observable<Partner> {
    const partner = PARTNERS.find(h => h.id === id)!;
    this.messageService.add(`PartnerService: socio n°${id} encontrado`);
    return of(partner);
  }
  constructor(private messageService: MessageService) { }
}
