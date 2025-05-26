import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsignComponent } from './loginsign.component';

describe('LoginsignComponent', () => {
  let component: LoginsignComponent;
  let fixture: ComponentFixture<LoginsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginsignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
