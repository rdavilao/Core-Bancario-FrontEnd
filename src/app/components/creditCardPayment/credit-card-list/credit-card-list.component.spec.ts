import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardPaymentListComponent } from './credit-card-list.component';

describe('CreditCardListComponent', () => {
  let component: CreditCardPaymentListComponent;
  let fixture: ComponentFixture<CreditCardPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardPaymentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
