import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from 'src/app/api-service/subject.service';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBarService } from 'src/app/service/mat-snack-bar.service';
import {TopicService} from '../../api-service/topic.service';
import {BookService} from '../../api-service/book.service';
import {PageService} from '../../api-service/page.service';
import { Editor, Toolbar } from 'ngx-editor';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  public showForm = false;
  public DM_MODE = 'Add';
  public form!: FormGroup;
  public selectedElement:any;
  public dataList = [];
  public allSubject = [];
  public selectTopic = '';
  public allTopic = [];
  public allTopicData = [];
  public allBook = [];
  public heading = '';
  public onChangeSearch = new Subject<string>();
  public originalData = [];
  public selectedBook = '';
  public allBookData  = [];
  public bookOriginalData  = [];
  public allDataListForFilter = [];
  public selectedPhoto: string | null = null;
  public imageError: string | null = null;
  public coverPhotoName = '';
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
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getList();
    this.getAllSubject()
    this.getBook();
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

  public createForm(data?: any) {
    
    this.form = this.formBuilder.group({
      subject: [data && data.subject.docId ? data.subject.docId : '', [Validators.required]],
      topic: [data && data.topic.docId ? data.topic.docId : '', [Validators.required]],
      book: [data && data.book.docId ? data.book.docId : '', [Validators.required]],
      page: [data && data.page ? data.page : '', [Validators.required]],
      cover_photo: [data && data.cover_photo ? data.cover_photo : ''],
      heading: [data && data.heading ? data.heading : '', [Validators.required]],
    });
    if(data){
      this.getAllTopic();
      this.getAllBook();
      this.selectedPhoto = data.cover_photo;
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

  public fileChangeEvent(fileInput: any): any{
    this.selectedPhoto = '';
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const maxSize = 20971520;
      if (fileInput.target.files[0].size > maxSize) {
        this.imageError =
          'Maximum size allowed is ' + maxSize / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        const [file] = fileInput.target.files;
        this.coverPhotoName = file.name;
        const imgBase64Path = e.target.result;
        this.selectedPhoto = imgBase64Path;
        // this.form.controls["cover_photo"].setValue( this.selectedPhoto);
        this.uploadUserImage(this.selectedPhoto , 'cover_photo');
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  private uploadUserImage(image:any,key:any): void {
    this.appComponent.showLoader();
    let imageArr: any;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const MAX_WIDTH = 1024;
      const MAX_HEIGHT = 1024;
      const canvas = document.createElement('canvas');
      const IMAGE_WIDTH = img.width;
      const IMAGE_HEIGHT = img.height;
      const scale = Math.min((MAX_WIDTH / IMAGE_WIDTH), (MAX_HEIGHT / IMAGE_HEIGHT));
      const iwScaled = IMAGE_WIDTH * scale;
      const ihScaled = IMAGE_HEIGHT * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      const ctx: any = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
      imageArr = canvas.toDataURL('image/jpeg', 0.5).split(',');
    const image = imageArr[1];
    this.pageService.uploadUserImage(image,'page').then(res => {
      this.appComponent.hideLoader();
      this.form.controls[key].setValue(res);
    });
  }
  }

  public clearFilter(){
    this.heading = '';
    this.selectedBook = '';
    this.dataList = this.allDataListForFilter;
  }


  public getAllBook(){
    this.bookService.getBookByDocId(this.form.value.topic).subscribe(res => {
      this.allBook = res;
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }

  public getBook(){
    this.bookService.getBook().subscribe(res => {
      this.allBookData = res;
      this.bookOriginalData = res;
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      this.matSnackBarService.showErrorSnackBar(error.message);
    });
  }
  
  public filterTopic() {
    this.selectedBook = '';
  }

  public filterData(){
    let bookData = [];
    if(this.selectTopic) {
      this.bookOriginalData.map((res:any) => {
        if(res.topic.topicName ==  this.selectTopic) {
          bookData.push(res);
        }
      });
      this.allBookData = bookData; 
    } else {
      bookData = this.bookOriginalData;
    }

    let data =  [];
    if(this.selectedBook || this.selectTopic){
      this.allDataListForFilter.map((res:any) => {
        if(res.topicName == this.selectTopic || (!this.selectTopic && this.selectedBook)){
          if(res.bookName == this.selectedBook || (!this.selectedBook && this.selectTopic)){
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
    searchList.map((book:any) => {
      const isExist = allData.find(res => res.bookName ==  book.book.bookName);
      if(isExist){
        isExist.bookArray.push(book);
      } else {
        const obj = {
          bookName: book.book.bookName,
          topicName: book.topic.topicName,
          bookArray: [book]
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
    this.pageService.getPage().subscribe(res => {
      this.dataList = res;
      this.originalData = res;
      const allData = [];
      res.map((book:any) => {
        const isExist = allData.find(res => res.bookName ==  book.book.bookName);
        if(isExist){
          isExist.bookArray.push(book);
        } else {
          const obj = {
            bookName: book.book.bookName,
            topicName: book.topic.topicName,
            bookArray: [book]
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
    this.selectedPhoto = '';
    this.coverPhotoName = '';
  }

  public open(data?){
    
    this.DM_MODE = 'Add';
    this.showForm = true;
    this.form = this.formBuilder.group({
      subject: [data && data.subject.docId ? data.subject.docId : '', [Validators.required]],
      topic: [data && data.topic.docId ? data.topic.docId : '', [Validators.required]],
      book: [data && data.book.docId ? data.book.docId : '', [Validators.required]],
      page: ['', [Validators.required]],
      cover_photo: [data && data.cover_photo ? data.cover_photo : ''],
      heading: ['', [Validators.required]],
    });
    if(data){
      this.getAllTopic();
      this.getAllBook();
      this.selectedPhoto = data.cover_photo;
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
    if (this.DM_MODE == 'Add') {
      formValue.authStatus = true;
      formValue.createDate = new Date();

      this.pageService.addPage(formValue)
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

      this.pageService.editPage(this.selectedElement.docId, formValue).subscribe((res: any) => {
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
    this.pageService.deletePage(element.docId).subscribe((res: any) => {
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
