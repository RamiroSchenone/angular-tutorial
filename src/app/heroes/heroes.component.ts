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

  partners: Partner[] = [];

  constructor(private partnerService: PartnerService) {}

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners(): void {
    this.partnerService.getPartners()
    .subscribe(partners => this.partners = partners)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.partnerService.addPartner({ name } as Partner)
      .subscribe(partner => {
        this.partners.push(partner);
      });
  }

  delete(partner: Partner): void {
    this.partners = this.partners.filter(h => h !== partner);
    this.partnerService.deletePartner(partner.id).subscribe();
  }
}
