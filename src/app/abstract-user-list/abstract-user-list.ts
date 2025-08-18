import { AfterViewChecked, Component, EventEmitter, input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { User } from '../app';

@Component({
  selector: 'app-abstract-user-list',
  imports: [],
  template: '',
})
export abstract class AbstractUserList<T> implements OnInit, OnChanges, AfterViewChecked  {
  // Inputs
items = input<T[]>([]);
  protected ngAfterViewCheckedCounter: number = 0;


ngOnInit(): void {
    
}

ngOnChanges(changes: SimpleChanges): void {
    
}

ngAfterViewChecked(): void {
      this.ngAfterViewCheckedCounter++;  
}





// TODO: это позже 
// isLoading = input<boolean>(false);
  
  // Internal state using signals
  protected selectedItem = signal<T | null>(null);
  protected searchTerm = signal<string>('');

  // Events
  @Output() itemSelected = new EventEmitter<T>();
  @Output() itemDeleted = new EventEmitter<string>();

  // Abstract methods
  // abstract handleItemClick(item: T): void;
  // abstract handleItemDelete(id: string): void;

  // Common functionality
  // protected sort(items: T[]): T[] {
  //   return [...items].sort((a, b) => a.name.localeCompare(b.name));
  // }

  protected search(term: string): void {
    this.searchTerm.set(term);
  }

  protected selectItem(item: T): void {
    this.selectedItem.set(item);
    this.itemSelected.emit(item);
  }
}
