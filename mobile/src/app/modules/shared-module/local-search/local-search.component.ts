import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-local-search',
  templateUrl: './local-search.component.html',
  styleUrls: ['./local-search.component.scss'],
})
export class LocalSearchComponent implements OnInit {

  public searchValue = '';
  @Output() searchResult = new EventEmitter<string>();
  public onChangeSearch = new Subject<string>();
  constructor() { }

  ngOnInit() {
    this.onChangeSearch
    .pipe(debounceTime(500))
    .subscribe(() => {
      this.searchResult.emit(this.searchValue);
    });
  }

  public getItems(){
    this.onChangeSearch.next();  }

}
