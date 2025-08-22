import { Injectable } from '@angular/core';
import { User } from '../app';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() {
    for (let index = 0; index < 100; index++) {
      const element = {
        id: index,
        name: 'name' + index,
      };
      this.users.push(element)      
    }

    // console.log(this.users);
    
   }

  users: User[] = [];  

  getUsers(offest: number, limit: number): Observable<User[]> {
    return of(this.users.slice(offest, limit));
  }
}
