import { AfterViewChecked, ChangeDetectionStrategy, Component, effect, input, OnInit } from '@angular/core';
import { User } from '../app';
import { CommonModule } from '@angular/common';
import { AbstractUserList } from '../abstract-user-list/abstract-user-list';

@Component({
  selector: 'app-default-cds',
  imports: [CommonModule],
  templateUrl: './default-cds.html',
  styleUrl: './default-cds.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DefaultCds implements OnInit, AfterViewChecked {
  inputList = input<User[] | undefined>();
  private ngAfterViewCheckedCounter: number = 0;
  // constructor() {
  //   effect(() => {
  //     // console.log('Current list value:', this.inputList());
  //   });
  // }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
      // this.ngAfterViewCheckedCounter++;
      // console.log('defAfterViewChecked', this.ngAfterViewCheckedCounter);
  }
}
