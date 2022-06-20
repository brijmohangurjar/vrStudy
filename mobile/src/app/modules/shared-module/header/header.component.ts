import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService, NoteService, PageDetailService, ShortDetailService, TopicService } from 'src/app/api-services';
import { NavigationService, ToastService } from 'src/app/service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {

  @Input() showToggleButton: boolean;
  @Input() showFilter: boolean;
  @Input() userDetail: any;
  @Input() heading: any;
  @Input() searchBar: any;
  @Input() navigationUrl: any;

  public searchValue = '';
  public pageList = [];
  public originalData = [];
  public originalBookData = [];
  public bookList = [];
  public topicList = [];
  public originalTopicData = [];
  public noteList = [];
  public originalNoteData = [];
  public shortList = [];
  public originalShortData = [];



  private subscriptions: Subscription[] = [];

  constructor(
    private pageDetailService: PageDetailService,
    private toastService: ToastService,
    private navigationService: NavigationService,
    private location: Location,
    private bookService: BookService,
    private topicService: TopicService,
    private noteService: NoteService,
    private shortDetailService: ShortDetailService
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.searchBar) {
      this.searchValue = '';
      this.pageList = [];
    }
  }

  public ngOnInit() {
    this.searchValue = '';
    this.getPageList();
    this.getBookList();
    this.getTopicList();
    this.getNoteList();
    this.getShortList();
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  public navigateToBack(): void {
    // this.navigationService.navigateByUrl('base')
    this.location.back();
  }

  public getItems() {
    const column = ['heading'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(this.searchValue, 'gi').test(row[key]));
    });
    this.pageList = searchList;

    const columnBook = ['bookName'];
    const searchBookList = this.originalBookData.filter((row: any) => {
      return columnBook.some(key => row.hasOwnProperty(key) && new RegExp(this.searchValue, 'gi').test(row[key]));
    });
    this.bookList = searchBookList;

    const columnTopic = ['topicName'];
    const searchTopicList = this.originalTopicData.filter((row: any) => {
      return columnTopic.some(key => row.hasOwnProperty(key) && new RegExp(this.searchValue, 'gi').test(row[key]));
    });
    this.topicList = searchTopicList;

    const columnNote = ['heading'];
    const searchNoteList = this.originalNoteData.filter((row: any) => {
      return columnNote.some(key => row.hasOwnProperty(key) && new RegExp(this.searchValue, 'gi').test(row[key]));
    });
    this.noteList = searchNoteList;

    const columnShort = ['heading'];
    const searchShortList = this.originalShortData.filter((row: any) => {
      return columnShort.some(key => row.hasOwnProperty(key) && new RegExp(this.searchValue, 'gi').test(row[key]));
    });
    this.shortList = searchShortList;
  }

  public onSelect(item: any) {
    // eslint-disable-next-line max-len
    this.navigationService.navigateByUrl(`/base/home/topic/${item.subject.docId}/book/${item.topic.docId}/page-list/${item.book.docId}/page-detail/${item.docId}`);
  }

  public transform(value: any, args: any): any {
    if (value) {
      const array = args.split(' ');
      if (!array && !array.length) { return value; }
      for (const text of array) {
        const reText = new RegExp(text, 'gi');
        value = value.replace(reText, '<b>' + text + '</b>');
      }
      return value;
    }
  }

  private getPageList(): void {
    this.pageDetailService.getAllPageList()
      .subscribe((result: any) => {
        if (result && result.length) {
          this.pageList = result;
          this.originalData = result;
        } else {
          this.pageList = [];
          this.originalData = [];
        }
      }, (error: HttpErrorResponse) => {
        console.log('error', error);
        this.toastService.errorToast(error.message);
      });
  }

  private getBookList(): void {
    this.subscriptions.push(
      this.bookService.getBookList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.bookList = result;
            this.originalBookData = result;
          } else {
            this.bookList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getTopicList(): void {
    this.subscriptions.push(
      this.topicService.getAllTopicList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.topicList = result;
            this.originalTopicData = result;
          } else {
            this.topicList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getNoteList(): void {
    this.subscriptions.push(
      this.noteService.getAllNoteList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.noteList = result;
            this.originalNoteData = result;
          } else {
            this.noteList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  private getShortList(): void {
    this.subscriptions.push(
      this.shortDetailService.getShortList()
        .subscribe((result: any) => {
          if (result && result.length) {
            this.shortList = result;
            this.originalShortData = result;
          } else {
            this.shortList = [];
          }
        }, (error: HttpErrorResponse) => {
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

}
