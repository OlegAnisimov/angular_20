import { TestBed } from '@angular/core/testing';

import { MockService } from './mock.service';

describe('MockService', () => {
  let service: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  method getUsers
  @params
  limit: number

  return Observable<User[]>
  */ 

  it('getUsers must return User[] with count equals limit param', () => {
    // expect(service.getUsers())
  })
});
