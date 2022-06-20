import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit, OnDestroy {

  public noteDetail: any;
  public noteDetailLoading = true;
  public loopForImageLoading = new Array(1);

  private noteDocId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private noteService: NoteService,
    private toastService: ToastService,
  ) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      console.log('param', param);
      this.noteDocId = param.get('noteDocId');
      if (this.noteDocId) {
        this.getNoteDetailByDocId(this.noteDocId);
      }
    });
  }

  public ngOnDestroy(): void {
    // console.log('Calling ngOnDestroy');
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) { sub.unsubscribe(); }
    });
  }

  private getNoteDetailByDocId(noteDocId: string): void {
    this.noteDetailLoading = true;
    this.subscriptions.push(
      this.noteService.getNoteDetailByDocId(noteDocId)
        .subscribe((responseData: any) => {
          console.log('responseData', responseData);
          this.noteDetailLoading = false;
          if (responseData) {
            this.noteDetail = responseData;
          } else {
            this.noteDetail = [];
          }
        }, (error: HttpErrorResponse) => {
          this.noteDetailLoading = false;
          console.log('error', error);
          this.toastService.errorToast(error.message);
        })
    );
  }
}
