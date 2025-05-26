import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtipsComponent } from './searchtips.component';

describe('SearchtipsComponent', () => {
  let component: SearchtipsComponent;
  let fixture: ComponentFixture<SearchtipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchtipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchtipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
