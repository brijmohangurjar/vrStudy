import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from 'src/app/api-service/subject.service';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBarService } from 'src/app/service/mat-snack-bar.service';
import {TopicService} from '../../api-service/topic.service';
import {BookService} from '../../api-service/book.service'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public showForm = false;
  public DM_MODE = 'Add';
  public form!: FormGroup;
  public selectedElement:any;
  public dataList = [];
  public allSubject = [];
  public allTopic = [];
  public heading = '';
  public onChangeSearch = new Subject<string>();
  public originalData = [];
  public selectedTopic = '';
  public allTopicData  = [];
  public allDataListForFilter = [];

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private matSnackBarService: MatSnackBarService,
    private appComponent: AppComponent,
    private topicService: TopicService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.getAllSubject();
    this.getTopic();
    this.onChangeSearch
    .pipe(debounceTime(1000))
    .subscribe(() => {
      this.search();
    })
  }

  public createForm(data?: any) {
    this.form = this.formBuilder.group({
      subject: [data && data.subject.docId ? data.subject.docId : '', [Validators.required]],
      topic: [data && data.topic.docId ? data.topic.docId : '', [Validators.required]],
      bookName: [data && data.bookName ? data.bookName : '', [Validators.required]],
    });
    if(data){
      this.getAllTopic();
    }
     setTimeout(() => {
      let elmnt:any = document.getElementById("scroll_stop");
      if(elmnt){
        elmnt.scrollIntoView();
      }
    }, 200);
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

  public changeSearchValue(): void {
    this.onChangeSearch.next();
  }

  
  public clearFilter(){
    this.heading = '';
    this.selectedTopic = '';
    this.dataList = this.allDataListForFilter;
  }


  public filterData(){
    let data =  [];
    if(this.selectedTopic){
      this.allDataListForFilter.map((res:any) => {
        if(res.topicName == this.selectedTopic){
          data.push(res);
        }
      });
      this.dataList = data;
    } else {
      this.dataList = this.allDataListForFilter;
    }
  
  }

  public search(){
    this.appComponent.showLoader();
    const column = ['bookName'];
    let searchList = this.originalData;
    if(this.heading) {
      searchList = this.originalData.filter((row: any) => {
        return column.some(key => row.hasOwnProperty(key) && new RegExp(this.heading, 'gi').test(row[key]));
      });
    }
 
    const allData = [];
    searchList.map((topic:any) => {
      const isExist = allData.find(res => res.topicName ==  topic.topic.topicName);
      if(isExist){
        isExist.topicArray.push(topic);
      } else {
        const obj = {
          topicName: topic.topic.topicName,
          topicArray: [topic]
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
    this.bookService.getBook().subscribe(res => {
      const allData = [];
      this.originalData = res;
      res.map((topic:any) => {
        const isExist = allData.find(res => res.topicName ==  topic.topic.topicName);
        if(isExist){
          isExist.topicArray.push(topic);
        } else {
          const obj = {
            topicName: topic.topic.topicName,
            topicArray: [topic]
          }
          allData.push(obj);
        }
      });
      this.dataList = allData;
      this.allDataListForFilter = allData;

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
    this.form = this.formBuilder.group({
      subject: [data && data.subject.docId ? data.subject.docId : '', [Validators.required]],
      topic: [data && data.topic.docId ? data.topic.docId : '', [Validators.required]],
      bookName: ['', [Validators.required]],
    });
    if(data){
      this.getAllTopic();
    }
    this.DM_MODE = 'Add';
    this.showForm = true;
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
    if (this.DM_MODE == 'Add') {
      formValue.authStatus = true;
      formValue.createDate = new Date();

      this.bookService.addBook(formValue)
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

      this.bookService.editBook(this.selectedElement.docId, formValue).subscribe((res: any) => {
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
    this.bookService.deleteBook(element.docId).subscribe((res: any) => {
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
