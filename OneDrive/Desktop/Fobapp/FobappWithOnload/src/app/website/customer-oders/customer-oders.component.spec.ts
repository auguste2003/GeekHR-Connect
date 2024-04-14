import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOdersComponent } from './customer-oders.component';

describe('CustomerOdersComponent', () => {
  let component: CustomerOdersComponent;
  let fixture: ComponentFixture<CustomerOdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerOdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
