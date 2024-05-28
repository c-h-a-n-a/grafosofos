import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lesson5ComponentComponent } from './lesson5-component.component';

describe('Lesson5ComponentComponent', () => {
  let component: Lesson5ComponentComponent;
  let fixture: ComponentFixture<Lesson5ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lesson5ComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Lesson5ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
