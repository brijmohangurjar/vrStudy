import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/app/api-services';
import { CommonService, ToastService } from 'src/app/service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit, OnDestroy {

  public notePageList = [];
  public notePageLoading = true;
  public loopForImageLoading = new Array(15);
  public originalData:any = [];
  public title = '';

  private bookId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private noteService: NoteService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.bookId = param.get('bookId');
      if (this.bookId) {
        this.getNoteListByBookId(this.bookId);
      } else {
        this.getAllNoteList();
      }
    });
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getAllNoteList(): void {
    this.commonService.noteData.subscribe(res => {
      if(res) {
        this.notePageList = res;
        this.originalData = res;
        this.notePageLoading = false;
        this.title = `Note - (${this.notePageList.length})`;
      }
    });
    // this.notePageLoading = true;
    // this.subscriptions.push(
    //   this.noteService.getAllNoteList()
    //     .subscribe((result: any) => {
    //       this.notePageLoading = false;
    //       if (result && result.length) {
    //         this.notePageList = result;
    //         this.originalData = result;
    //       } else {
    //         this.notePageList = [];
    //       }
    //     }, (error: HttpErrorResponse) => {
    //       this.notePageLoading = false;
    //       console.log('error', error);
    //       this.toastService.errorToast(error.message);
    //     })
    // );
  }

  private getNoteListByBookId(bookId: string): void {
    this.notePageLoading = true;
    this.subscriptions.push(
      this.noteService.getNoteListByBookId(bookId)
        .subscribe((result: any) => {
          this.notePageLoading = false;
          this.notePageList = result;
          this.originalData = result;
          this.title = `Note - (${this.notePageList.length})`;
        }, (error: HttpErrorResponse) => {
          this.notePageLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }

  public onChangeSearch(event) {
    const column = ['heading'];
    const searchList = this.originalData.filter((row: any) => {
      return column.some(key => row.hasOwnProperty(key) && new RegExp(event, 'gi').test(row[key]));
    });
    this.notePageList = searchList;
  }
}
