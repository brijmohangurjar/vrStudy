import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBarService } from 'src/app/service/mat-snack-bar.service';
import {SubjectService}  from '../../api-service/subject.service'

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public showForm = false;
  public DM_MODE = 'Add';
  public form!: FormGroup;
  public selectedElement:any;
  public dataList = [];

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private matSnackBarService: MatSnackBarService,
    private appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getList();
  }

  public createForm(data?: any) {
    this.form = this.formBuilder.group({
      name: [data && data.name ? data.name : '', [Validators.required]],
    });
    setTimeout(() => {
      let elmnt:any = document.getElementById("scroll_stop");
      if(elmnt){
        elmnt.scrollIntoView();
      }
    }, 200);
  }

  public getList(){
    this.appComponent.showLoader();
    this.subjectService.getSubject().subscribe(res => {
      this.dataList = res;
      this.appComponent.hideLoader();
    }, (error: HttpErrorResponse) => {
      this.appComponent.hideLoader();
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }

  public deleteData(element: any) {
    this.appComponent.showLoader();
    this.subjectService.deleteSubject(element.docId).subscribe((res: any) => {
      if (res.status === 200) {
      }
      this.appComponent.hideLoader();
    }, (error: any) => {
      this.appComponent.hideLoader();
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error);
    });
  }

  public close(){
    this.showForm = false;
    this.form.reset();
  }

  public open(){
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
    if (this.DM_MODE == 'Add') {
      formValue.createDate = new Date();
      this.subjectService.addSubject(formValue)
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

      this.subjectService.editSubject(this.selectedElement.docId, formValue).subscribe((res: any) => {
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



}
