import { Component, OnInit } from '@angular/core';
import { Partner } from '../heroes/partner'
import { PartnerService } from '../partner.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  partners: Partner [] = [];
  constructor(private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners(): void {
    this.partnerService.getPartners().
    subscribe(partners => this.partners = partners.slice(0, 4));
  }

}
