import { Component, OnInit , Input } from '@angular/core';
import { Partner } from '../heroes/partner'; 

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit {

  @Input() partner?: Partner;
  constructor() { }

  ngOnInit(): void {
  }

}
