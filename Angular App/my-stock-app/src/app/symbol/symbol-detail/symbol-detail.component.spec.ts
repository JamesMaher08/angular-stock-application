import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolDetailComponent } from './symbol-detail.component';

describe('SymbolComponent', () => {
  let component: SymbolDetailComponent;
  let fixture: ComponentFixture<SymbolDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
