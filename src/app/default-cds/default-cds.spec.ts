import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCds } from './default-cds';

describe('DefaultCds', () => {
  let component: DefaultCds;
  let fixture: ComponentFixture<DefaultCds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultCds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
