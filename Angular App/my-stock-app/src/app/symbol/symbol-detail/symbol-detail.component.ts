import { Component, OnInit } from '@angular/core';
import { CompanyProfileService } from '../../shared/services/company-profile.service';
import { GetAllSymbolNamesService } from '../../shared/services/get-all-symbol-names.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-symbol-detail',
  templateUrl: './symbol-detail.component.html',
  styleUrls: ['./symbol-detail.component.scss']
})
export class SymbolDetailComponent implements OnInit {

  symbol:string;
  companyResults:string;
  allSymbolNames;
  symbolName: string;

  constructor(private companyProfileService: CompanyProfileService,
    private getAllSymbolNamesService: GetAllSymbolNamesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getSymbol();
  }

  getSymbol() {
   this.symbol = this.route.snapshot.paramMap.get("symbol");
   this.companyProfileService.getCompanyProfile(this.symbol).subscribe(result => {
    console.log("Result", result);
    this.companyResults = result;
  });
  }

}
