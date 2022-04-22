import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from 'src/app/api-service/subject.service';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBarService } from 'src/app/service/mat-snack-bar.service';
import {TopicService} from '../../api-service/topic.service';
import {BookService} from '../../api-service/book.service';
import {PageService} from '../../api-service/page.service';
import {ShortService} from '../../api-service/short.service'
import { Editor, Toolbar } from 'ngx-editor';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; 
import { NoteService } from '../../api-service/note.service'


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public showForm = false;
  public DM_MODE = 'Add';
  public form!: FormGroup;
  public selectedElement:any;
  public dataList = [];
  public allSubject = [];
  public selectTopic = '';
  public allTopicData = [];
  public allTopic = [];
  public allBook = [];
  public allPage = [];
  public heading = '';
  public onChangeSearch = new Subject<string>();
  public originalData = [];
  public selectedPage = '';
  public allPageData  = [];
  public allDataListForFilter = [];
  public pageOriginalData  = [];

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private matSnackBarService: MatSnackBarService,
    private appComponent: AppComponent,
    private topicService: TopicService,
    private bookService: BookService,
    private pageService: PageService,
    private shortService: ShortService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getList();
    this.getAllSubject();
    this.getPage();
    this.getTopic();
    this.editor = new Editor();
    this.onChangeSearch
    .pipe(debounceTime(1000))
    .subscribe(() => {
      this.search();
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public changeSearchValue(): void {
    this.onChangeSearch.next();
  }

  public createForm(data?: any) {
    this.form = this.formBuilder.group({
      subject: [data && data.subject.docId ? data.subject.docId : '', [Validators.required]],
      topic: [data && data.topic.docId ? data.topic.docId : '', [Validators.required]],
      book: [data && data.book.docId ? data.book.docId : '', [Validators.required]],
      page: [data && data.page ? data.page.docId : '', [Validators.required]],
      heading: [data && data.heading ? data.heading : ''],
      note: [data && data.note ? data.note : '', [Validators.required]],
    });
    if(data){
      this.getAllTopic();
      this.getAllBook();
      this.getAllPage();
    }
   setTimeout(() => {
      let elmnt:any = document.getElementById("scroll_stop");
      if(elmnt){
        elmnt.scrollIntoView();
      }
    }, 200);
  }

  public clearFilter(){
    this.heading = '';
    this.selectedPage = '';
    this.selectTopic = '';
    this.dataList = this.allDataListForFilter;
  }
  
  private getAllSubject(){
    this.subjectService.getSubject().subscribe(res => {
      this.allSubject = res;
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }
  public getAllTopic(){
    this.topicService.getTopicByDocId(this.form.value.subject).subscribe(res => {
      this.allTopic = res;
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }
  public getTopic(){
    this.topicService.getTopic().subscribe(res => {
      this.allTopicData = res;
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }

  public getAllBook(){
    this.bookService.getBookByDocId(this.form.value.topic).subscribe(res => {
      this.allBook = res;
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }

  public getAllPage(){
    this.pageService.getPageByDocId(this.form.value.book).subscribe(res => {
      this.allPage = res;
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }

  
  public getPage(){
    this.pageService.getPage().subscribe(res => {
      this.allPageData = res;
      this.pageOriginalData = res;
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }

  public filterTopic(){
    this.selectedPage = '';
  }
    
  public filterData(){
    let data =  [];
    let pageData = [];
    if(this.selectTopic) {
      this.pageOriginalData.map((res:any) => {
        if(res.topic.topicName == this.selectTopic){
           pageData.push(res);
        }
      });
      this.allPageData = pageData;
    } else {
      this.allPageData = this.pageOriginalData;
    }
    
    if(this.selectedPage || this.selectTopic){
      this.allDataListForFilter.map((res:any) => {
        if(res.topicName == this.selectTopic || (!this.selectTopic && this.selectedPage)){
          if(res.heading == this.selectedPage || (!this.selectedPage && this.selectTopic)){
            data.push(res);
          }
        }
      });
      this.dataList = data;
    } else {
      this.dataList = this.allDataListForFilter;
    }
  
  }

  public search(){
    this.appComponent.showLoader();
    const column = ['heading'];
    let searchList = this.originalData;
    if(this.heading) {
      searchList = this.originalData.filter((row: any) => {
        return column.some(key => row.hasOwnProperty(key) && new RegExp(this.heading, 'gi').test(row[key]));
      });
    }
 
    const allData = [];
    searchList.map((page:any) => {
      const isExist = allData.find(res => res.page ==  page.page.heading);
      if(isExist){
        isExist.pageArray.push(page);
      } else {
        const obj = {
          page: page.page.page,
          heading: page.page.heading,
          topicName: page.topic.topicName,
          pageArray: [page]
        }
        allData.push(obj);
      }
    });
    this.dataList = allData;
    setTimeout(() => {
      this.appComponent.hideLoader();
    }, 1000);
  }


  public getList(){
    this.appComponent.showLoader();
    this.noteService.getNote().subscribe(res => {
      this.dataList = res;
      this.originalData = res;
      const allData = [];
      res.map((page:any) => {
        const isExist = allData.find(res => res.page ==  page.page.page);
        if(isExist){
          isExist.pageArray.push(page);
        } else {
          const obj = {
            page: page.page.page,
            heading: page.page.heading,
            topicName: page.topic.topicName,
            pageArray: [page]
          }
          allData.push(obj);
        }
      });
      this.dataList = allData;
      this.allDataListForFilter = allData;
      this.filterData();
      this.appComponent.hideLoader();
    }, (error: HttpErrorResponse) => {
      this.appComponent.hideLoader();
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }

  public close(){
    this.showForm = false;
    this.form.reset();
  }

  public open(data?){
    this.DM_MODE = 'Add';
    this.showForm = true;
    this.form = this.formBuilder.group({
      subject: [data && data.subject.docId ? data.subject.docId : '', [Validators.required]],
      topic: [data && data.topic.docId ? data.topic.docId : '', [Validators.required]],
      book: [data && data.book.docId ? data.book.docId : '', [Validators.required]],
      page: [data && data.page.docId ? data.page.docId : '', [Validators.required]],
      heading: [''],
      note: ['', [Validators.required]],
    });
    if(data){
      this.getAllTopic();
      this.getAllBook();
      this.getAllPage();
    }
   setTimeout(() => {
      let elmnt:any = document.getElementById("scroll_stop");
      if(elmnt){
        elmnt.scrollIntoView();
      }
    }, 200);
  }

  public updateData(element){
    this.selectedElement = element;
    this.DM_MODE = "Edit";
    this.showForm = true;
    this.createForm(element);
  }

  public saveData(){
    this.appComponent.showLoader();
    let formValue = this.form.value;
    formValue.subject = this.allSubject.find(res=> res.docId == this.form.value.subject);
    const topic = this.allTopic.find(res=> res.docId == this.form.value.topic);
    formValue.topic = {
      topicName: topic.topicName,
      docId: topic.docId
    }
    const book = this.allBook.find(res=> res.docId == this.form.value.book);
    formValue.book = {
      bookName: book.bookName,
      docId: book.docId
    };

    const page = this.allPage.find(res=> res.docId == this.form.value.page);
    formValue.page = {
      page: page.page,
      heading: page.heading,
      docId: page.docId
    };

    if (this.DM_MODE == 'Add') {
      formValue.authStatus = true;
      formValue.createDate = new Date();

      this.noteService.addNote(formValue)
        .subscribe((res: any) => {
          if (res.status === 200) {
            this.close();
            this.matSnackBarService.showSuccessSnackBar(res.message);
          }
         this.appComponent.hideLoader();
        }, (error: HttpErrorResponse) => {
         this.appComponent.hideLoader();
          console.log('error', error);
          this.matSnackBarService.showErrorSnackBar(error.message);
        });
    } else {

      this.noteService.editNote(this.selectedElement.docId, formValue).subscribe((res: any) => {
        if (res.status === 200) {
          this.close();
          this.matSnackBarService.showSuccessSnackBar(res.message);
        }
        this.appComponent.hideLoader();
      }, (error: any) => {
        this.appComponent.hideLoader();
        console.log('error', error);
        this.matSnackBarService.showErrorSnackBar(error);
      });
    }
  }

  public deleteData(element: any) {
    this.appComponent.showLoader();
    this.noteService.deleteNote(element.docId).subscribe((res: any) => {
      if (res.status === 200) {
      }
      this.appComponent.hideLoader();
    }, (error: any) => {
      this.appComponent.hideLoader();
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error);
    });
  }
  



}
