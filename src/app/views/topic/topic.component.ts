import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SubjectService } from 'src/app/api-service/subject.service';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBarService } from 'src/app/service/mat-snack-bar.service';
import {TopicService} from '../../api-service/topic.service'

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  public showForm = false;
  public DM_MODE = 'Add';
  public form!: FormGroup;
  public selectedElement:any;
  public dataList = [];
  public allSubject = [];
  public heading = '';
  public onChangeSearch = new Subject<string>();
  public originalData = [];
  public selectedSubject = '';
  public allSubjectData  = [];
  public allDataListForFilter = [];

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private matSnackBarService: MatSnackBarService,
    private appComponent: AppComponent,
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getList();
    this.getAllSubject();
    this.getSubject();
    this.onChangeSearch
    .pipe(debounceTime(1000))
    .subscribe(() => {
      this.search();
    })
  }

  public createForm(data?: any) {
    this.form = this.formBuilder.group({
      subject: [data && data.subject.docId ? data.subject.docId : '', [Validators.required]],
      topicName: [data && data.topicName ? data.topicName : '', [Validators.required]],
    });
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
  private getSubject(){
    this.subjectService.getSubject().subscribe(res => {
      this.allSubjectData = res;
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
    this.selectedSubject = '';
    this.dataList = this.allDataListForFilter;
  }

  public filterData(){
    let data =  [];
    if(this.selectedSubject){
      this.allDataListForFilter.map((res:any) => {
        if(res.subjectName == this.selectedSubject){
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
    const column = ['topicName'];
    let searchList = this.originalData;
    if(this.heading) {
      searchList = this.originalData.filter((row: any) => {
        return column.some(key => row.hasOwnProperty(key) && new RegExp(this.heading, 'gi').test(row[key]));
      });
    }
 
    const allData = [];
    searchList.map((subject:any) => {
      const isExist = allData.find(res => res.subjectName ==  subject.subject.name);
      if(isExist){
        isExist.subjectArray.push(subject);
      } else {
        const obj = {
          subjectName: subject.subject.name,
          subjectArray: [subject]
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
    this.topicService.getTopic().subscribe(res => {
      const allData = [];
      this.originalData = res;
      res.map((subject:any) => {
        const isExist = allData.find(res => res.subjectName ==  subject.subject.name);
        if(isExist){
          isExist.subjectArray.push(subject);
        } else {
          const obj = {
            subjectName: subject.subject.name,
            subjectArray: [subject]
          }
          allData.push(obj);
        }
      });
      this.dataList = allData;
      this.allDataListForFilter = allData;
      this.appComponent.hideLoader();
      this.filterData();
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
      topicName: ['', [Validators.required]],
    });
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
    if (this.DM_MODE == 'Add') {
      formValue.authStatus = true;
      formValue.createDate = new Date();

      this.topicService.addTopic(formValue)
        .subscribe((res: any) => {
          if (res.status === 200) {
            this.matSnackBarService.showSuccessSnackBar(res.message);
          }
         this.appComponent.hideLoader();
         this.close();
        }, (error: HttpErrorResponse) => {
         this.appComponent.hideLoader();
          console.log('error', error);
          this.matSnackBarService.showErrorSnackBar(error.message);
        });
    } else {

      this.topicService.editTopic(this.selectedElement.docId, formValue).subscribe((res: any) => {
        if (res.status === 200) {
          this.close();
          this.form.reset();
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
    this.topicService.deleteTopic(element.docId).subscribe((res: any) => {
      this.appComponent.hideLoader();
    }, (error: any) => {
      this.appComponent.hideLoader();
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error);
    });
  }



}
