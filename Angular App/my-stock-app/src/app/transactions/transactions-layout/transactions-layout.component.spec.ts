import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsLayoutComponent } from './transactions-layout.component';

describe('TransactionsLayoutComponent', () => {
  let component: TransactionsLayoutComponent;
  let fixture: ComponentFixture<TransactionsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
