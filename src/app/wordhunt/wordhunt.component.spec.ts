import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordhuntComponent } from './wordhunt.component';

describe('WordhuntComponent', () => {
  let component: WordhuntComponent;
  let fixture: ComponentFixture<WordhuntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordhuntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordhuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
