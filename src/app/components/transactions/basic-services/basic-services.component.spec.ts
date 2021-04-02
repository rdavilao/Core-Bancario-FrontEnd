import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicServicesComponent } from './basic-services.component';

describe('BasicServicesComponent', () => {
  let component: BasicServicesComponent;
  let fixture: ComponentFixture<BasicServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
