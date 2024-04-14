import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselResponsiveDemoComponent } from './carousel-responsive-demo.component';

describe('CarouselResponsiveDemoComponent', () => {
  let component: CarouselResponsiveDemoComponent;
  let fixture: ComponentFixture<CarouselResponsiveDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselResponsiveDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselResponsiveDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
