import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostajobComponent } from './postajob.component';

describe('PostajobComponent', () => {
  let component: PostajobComponent;
  let fixture: ComponentFixture<PostajobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostajobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostajobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
