import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolLayoutComponent } from './symbol-layout.component';

describe('SymbolLayoutComponent', () => {
  let component: SymbolLayoutComponent;
  let fixture: ComponentFixture<SymbolLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
