import { Component, OnInit } from '@angular/core';
import { Partner } from '../heroes/partner';
import { PartnerService } from '../partner.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedPartner?: Partner;
  partners: Partner[] = [];

  constructor(private partnerService: PartnerService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getPartners();
  }

  onSelect(partner: Partner): void {
    this.selectedPartner = partner;
    this.messageService.add(`PartnerComponent: Selected partner id=${partner.id}`);
  }

  getPartners(): void {
    this.partnerService.getPartners()
    .subscribe(partners => this.partners = partners)
  }

}
