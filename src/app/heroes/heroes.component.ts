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

}
