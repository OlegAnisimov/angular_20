import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractUserList } from './abstract-user-list';

describe('AbstractUserList', () => {
  let component: AbstractUserList;
  let fixture: ComponentFixture<AbstractUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractUserList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbstractUserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
