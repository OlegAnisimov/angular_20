import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnpushCds } from './onpush-cds';

describe('OnpushCds', () => {
  let component: OnpushCds;
  let fixture: ComponentFixture<OnpushCds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnpushCds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnpushCds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
