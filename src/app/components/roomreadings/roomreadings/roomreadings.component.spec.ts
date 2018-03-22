import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomreadingsComponent } from './roomreadings.component';

describe('RoomreadingsComponent', () => {
  let component: RoomreadingsComponent;
  let fixture: ComponentFixture<RoomreadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomreadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomreadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
