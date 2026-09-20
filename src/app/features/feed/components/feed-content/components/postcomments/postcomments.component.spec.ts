import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcommentsComponent } from './postcomments.component';

describe('PostcommentsComponent', () => {
  let component: PostcommentsComponent;
  let fixture: ComponentFixture<PostcommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostcommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
