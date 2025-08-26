import { AfterViewChecked, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  Component, 
  DoCheck, 
  effect, inject, Input, input, OnChanges, OnDestroy, OnInit, Signal, SimpleChanges } from '@angular/core';
import { User } from '../app';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AbstractUserList } from '../abstract-user-list/abstract-user-list';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-onpush-cds',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './onpush-cds.html',
  styleUrl: './onpush-cds.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnpushCds implements OnInit, OnChanges, DoCheck
// , AfterViewChecked
, OnDestroy {
  // PROPS
  inputList = input<User[] | undefined>();
  private ngAfterViewCheckedCounter: number = 0;
  private intervalMarcForCheck: any;

  readonly needUpdate = input<boolean>();
  @Input() needUpdate$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  @Input() testPimitiveInput: number = 0;


  constructor() {
    effect(() => {
  console.log(`The current inputList is: ${this.inputList()}`);
});
  }

  // SERVICES
  private cdr = inject(ChangeDetectorRef);
  // @Input() inputList: User[] | undefined;
  // constructor() {
  //   effect(() => {
  //     console.log('Current list value:', this.inputList());
  //   });
  // }

  // inject()

  ngDoCheck(): void {
      
  }

   ngOnInit(): void {
    //  method with interval and markForCheck
    /* код ниже приводит к зависанию проекта */
    // this.intervalMarcForCheck = setInterval(() => {
    //   this.cdr.markForCheck();
    // }, 1000);

    // Отключение компонента от дерева обнаружения изменений и периодическая ручная проверка:
    /* код ниже приводит к зависанию проекта */
    //  this.cdr.detach();
    //  this.intervalMarcForCheck = setInterval(() => {
    //   this.cdr.detectChanges();
    // }, 1000);
// this.needUpdate$.subscribe((value) => {
//   console.log('obs input',  value);
//   });


  
 
}

   ngOnChanges(changes: SimpleChanges): void {
      // console.log('changes', changes);
  }

   ngAfterViewChecked(): void {
      // this.ngAfterViewCheckedCounter++;
      // console.log('onPush AfterViewChecked', this.ngAfterViewCheckedCounter);      
  }

  logInputList() {    
    // console.log(2);
    // console.log(2, this.inputList());
  }


  ngOnDestroy(): void {
    // clearInterval(this.intervalMarcForCheck);
  }

}
