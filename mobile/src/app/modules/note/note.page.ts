import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit, OnDestroy {

  public noteDetail: any;
  public notePageLoading = true;
  public loopForImageLoading = new Array(1);

  private bookId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private noteService: NoteService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.bookId = param.get('bookId');
      if (this.bookId) {
        this.getNoteDetailByBookId(this.bookId);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getNoteDetailByBookId(bookId: string): void {
    this.notePageLoading = true;
    this.subscriptions.push(
      this.noteService.getNoteDetailByBookId(bookId)
        .subscribe((responseData: any) => {
          this.notePageLoading = false;
          if (responseData.length) {
            this.noteDetail = responseData[0];
          } else {
            this.noteDetail = null;
          }
        }, (error: HttpErrorResponse) => {
          this.notePageLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }
}
