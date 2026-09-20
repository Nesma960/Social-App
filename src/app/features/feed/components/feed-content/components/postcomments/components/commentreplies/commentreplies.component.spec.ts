import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentrepliesComponent } from './commentreplies.component';

describe('CommentrepliesComponent', () => {
  let component: CommentrepliesComponent;
  let fixture: ComponentFixture<CommentrepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentrepliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentrepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
