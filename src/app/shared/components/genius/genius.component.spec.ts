import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeniusComponent } from './genius.component';

describe('GeniusComponent', () => {
  let component: GeniusComponent;
  let fixture: ComponentFixture<GeniusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeniusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeniusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
