import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapfileListComponent } from './mapfile-list.component';

describe('MapfileListComponent', () => {
  let component: MapfileListComponent;
  let fixture: ComponentFixture<MapfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapfileListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
