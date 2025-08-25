import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultCds } from './default-cds/default-cds';
import { OnpushCds } from './onpush-cds/onpush-cds';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

export interface User {
  id: number;
  name: string;
  age?: number;
  email?: string;
  date?: Date;
  foo?: Function;
  bar?: any;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DefaultCds, OnpushCds, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit
//, AfterViewChecked 
{
  protected readonly title = signal('angular_20');
  // private _list: User[] = [];
  list: User[] = [];
  // TODO: see getters setters
  // public get list(): User {
  //   return this._list;
  // }
  // public set list(value: User) {
  //   this._list = value;
  // }

  // VIEW CHILD
  @ViewChild(DefaultCds) defaultCds!: DefaultCds;;
  @ViewChild(OnpushCds) onpushCds!: OnpushCds;

  private cdr = inject(ChangeDetectorRef);

  needUpdate = signal<boolean>(false);
  needUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  testPimitiveInput: number = 0;

constructor() {  
    //       setInterval(() => {
    //   // require view to be updated
    //   this.cdr.markForCheck();
    // }, 1000);
}

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      const element = {
        id: index,
        name: 'name' + index,
      };
      this.list.push(element)
    }
  }

  ngAfterViewChecked(): void {
      // console.trace();
      // console.log('app.ts ngAfterViewChecked');
      // console.log(this.defaultCds, this.onpushCds);
      
  }

  mutateList() {
    this.list[0].name += '1';

    if (!this.list[0].foo) {
      this.list[0].foo = () => {
        console.log('foo');
      };
    }

    if (!this.list[0].date) {
      this.list[0].date = new Date();
    }

    if (!this.list[0].bar) {
      this.list[0].bar = {
        a: 11,
        b: [11],
        c: {
          d: 11,
          e: () => {
            console.log('e');
          }
        }
      }
    }

    //  SHALLOW COPIES
    // this.list = [...this.list];
    // this.list = this.list.slice();

        // DEEP COPIES 
    // this.list = JSON.parse(JSON.stringify(this.list));
    // this.list = structuredClone(this.list);



    console.log(this.list);
    console.log(this.list[0].date);
    // @ts-ignore
    this.list[0].foo();
    // @ts-ignore
    // this.list[0].bar.e();

    // SIGNL
    // this.needUpdate.update(() => true);

    // obs
    // this.needUpdate$.next(true);

    // PRIMITIVE  
    // this.testPimitiveInput++;    
  }

  testOnPush() {
    console.log('click on component with onPush triggers cd cycle');
  }
  
  testOnDefault() {
    console.log('click on component with Default triggers cd cycle');
  }
}




/*TODO
  см работу разных стратегий с учетом
    дом эвентов
    мутаций обсерваблов
    сигналов
    работай с массивами и объектами
  см память при создании нового объекта  

  добавить потомков в два компонента с разными стратегиями см поведение
  
  применить методы cdr

  надо проверить @output events

  если нет хендлера для дом эвента, то будет ли тригерится цикл cd?
    судя по опытам для тригера нужен хэндлер
*/ 

/*
cd - change detection
*/ 


/* Отличие shallow copy от deep copy
в shallow copy вложенные объекты копируются по ссылке 
  - здесь изменение в оригинальном объекте приводит к изменениям в копии объекта   
в deep copy создаются новые версии вложенных объектов
см ниже комментарий - "пример копирования"

в angular OnPush cds реагирует на изменения ссылки на объект а не значений внутри объекта, то есть 
    один из методов запуска цикла cd создание новой копии объекта примеры с особенностями shallow и deep копий ниже

в angular OnPush cds реагирует на дом эвенты на который назначен хэндлер внутри компонента     
*/  


    //  SHALLOW COPIES
        //  создание shallow copy with spread syntax
    // this.list = [...this.list];


        //  создание shallow copy with Array.prptotype.slice()
    // this.list = this.list.slice();
    //  SHALLOW COPIES

    
    // DEEP COPIES 
    // создание deep copy с помощью сериализации
    /* метд сериализации выполняется с помощью this.list = JSON.parse(JSON.stringify(this.list));
      создает дип копии объекта при этом некорректно работает  с:
        с функциями - вызов функции с дип копии вызовет ошибку
        с оббъектами типа Date
        ...
        for example, functions (with closures), 
        Symbols, objects that represent HTML elements in the HTML DOM API, recursive data,
    */
    // this.list = JSON.parse(JSON.stringify(this.list));


    // создание deep copy с помощью сериализации
    // this.list = structuredClone(this.list);
    // DEEP COPIES 
/* пример копирования
const original = {
  a: 1,
  b: 2,
  obj: {
    foo: 'bar'
  }
};

const shallow = {...original};
const structuredCloneDeepCopy = structuredClone(original);
const serializeDeepCopy = JSON.parse(JSON.stringify(original));


// console.log('before', shallow);
// console.log('before', structuredCloneDeepCopy);
console.log('before', serializeDeepCopy);


original.a = 10;
original.obj.foo = '10';
// console.log('after', shallow);
// console.log('after', structuredCloneDeepCopy);
console.log('after', serializeDeepCopy);
*/

/* onPush - check once
Triggers
1. OnPush change detector gets triggered if a component event handler gets triggered
2. OnPush change detector gets triggered changes primitives @Input
3. OnPush change detector gets triggered emiting by observable via async pipe, cause it`s impact on template
4. OnPush change detector gets triggered change objects by ref
. cdr methods ...
. event handlers by HostEventListner - NEED CHECK

not triggers
1. By observable via sunscription in model
2. By mutation objects

*/ 