import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardPaymentComponent } from './credit-card.component';

describe('CreditCardComponent', () => {
  let component: CreditCardPaymentComponent;
  let fixture: ComponentFixture<CreditCardPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
