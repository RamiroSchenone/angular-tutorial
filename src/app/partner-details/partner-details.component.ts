import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Partner } from '../heroes/partner';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit {

  @Input() partner?: Partner;
  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPartner();
  }

  getPartner(): void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.partnerService.getPartner(id)
    .subscribe(partner => this.partner = partner);
  }

  goBack(): void
  {
    this.location.back();
  }

}
