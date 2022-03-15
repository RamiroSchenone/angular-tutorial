import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Partner } from '../heroes/partner';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-partner-search',
  templateUrl: './partner-search.component.html',
  styleUrls: ['./partner-search.component.css']
})
export class PartnerSearchComponent implements OnInit {
  
  partners$!: Observable<Partner[]>;
  private searchTerms = new Subject<string>();

  constructor(private partnerService: PartnerService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void 
  {
    this.partners$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.partnerService.searchPartners(term)),
    );
  }
}
