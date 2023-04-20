import { Component, OnInit } from '@angular/core';
import { CompanyProfileService } from '../../services/company-profile.service';
import { GetAllSymbolNamesService } from '../../services/get-all-symbol-names.service';
import { MOCK_ALL_SYMBOL_NAMES } from '../../../shared/mocks/mock-all-symbol-names-payload';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  company:string = "UNP";
  companyResults:string;
  allSymbolNames;
  symbolName: string;

  constructor(private companyProfileService: CompanyProfileService, private getAllSymbolNamesService: GetAllSymbolNamesService) { }

  ngOnInit(): void {
  }

  getCompany(company: string) {
    this.companyProfileService.getCompanyProfile(company).subscribe(result => {
      console.log("Result", result);
      this.companyResults = result;
    });
  }

  getAllSymbolNames() {
    this.getAllSymbolNamesService.getAllSymbolNames().subscribe(result => {
      this.allSymbolNames = result;
    });
  }

  getMocks() {
    this.allSymbolNames = MOCK_ALL_SYMBOL_NAMES;
  }

  clear() {
    this.allSymbolNames = "";
  }

  findSymbolName(symbol:string) {
    if (this.allSymbolNames) {
      let matchingSymbol = this.allSymbolNames.find(x => x.symbol.toUpperCase() === symbol.toUpperCase());
      if (matchingSymbol) {
        this.symbolName = matchingSymbol.name;
      } else {
        this.symbolName = null;
      }
    }
  }

}
