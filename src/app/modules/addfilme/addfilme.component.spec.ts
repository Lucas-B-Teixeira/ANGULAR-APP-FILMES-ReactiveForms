import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfilmeComponent } from './addfilme.component';

describe('AddfilmeComponent', () => {
  let component: AddfilmeComponent;
  let fixture: ComponentFixture<AddfilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfilmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
