import { PostsService } from './../../core/services/post.service';
import { ITooltip } from './../../core/interfaces/tooltip.interface';
import { Component, OnInit, TemplateRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileError, NgxfUploaderService, UploadEvent, UploadStatus } from 'ngxf-uploader';
import { Observable, from, ReplaySubject } from 'rxjs';
import { concatMap, takeUntil, switchMap, tap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-posts-add',
    templateUrl: './posts-add.component.html',
    styleUrls: ['./posts-add.component.scss']
})
export class PostsAddComponent implements OnInit, OnDestroy {
    public isFocus: boolean = false;
    public settingsTooltipInfo: ITooltip;
    public settingsTooltipWarning: ITooltip;
    public selectedCategories = [];
    public isShowSelectRubrics = true;
    modalRef: BsModalRef;
    public form: FormGroup;
    public fields: any[];
    public photoItem: any = {};
    public postForm: FormGroup;
    isUploading: boolean = true;
    progress: number = 0;
    public photos: any[] = [
        {}, {}, {}, {}, {}, {}, {}
    ];

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    private ngOnDestroy$: ReplaySubject<null> = new ReplaySubject<null>();
    loadingPostCreate: boolean;

    constructor(
        private modalService: BsModalService,
        public postService: PostsService,
        private Upload: NgxfUploaderService
    ) {
        this.settingsTooltipInfo = {
            imgUrl: 'assets/img/icon Инфо.png',
            placement: 'right',
            contentHtml: `
        <div>Введите наименование товара или услуги.</div>
        <br>
        <div>Чем точнее будет заголовок, тем больше вероятность что на Ваше обьявление отреагируют</div>
      `,
            click: ''
        };
        this.settingsTooltipWarning = {
            imgUrl: 'assets/img/warning.png',
            placement: 'right',
            contentHtml: `
        <div class="tooltip-text-red">Введите описание.</div>
        <br>
        <div class="tooltip-text-red">Описание должно быть не мение 20 символов.</div>
      `,
            click: ''
        };
        this.form = new FormGroup({
            fields: new FormControl(this.fields)
        });
    }


    // START


    uploadFile(file: File | FileError, index: number): void {
        const photo = this.photos[index];
        photo.uploadStatus = {};
        photo.uploadStatus.isUploading = true;
        if (!(file instanceof File)) {
            photo.uploadStatus.isUploading = false;
            return;
        }
        this.Upload.upload({
            url: 'http://test4.vpotoke.com/api/v1/posts/files',
            filesKey: 'path', // Option
            files: file,
            process: true
        }).subscribe(
            (event: UploadEvent) => {
                photo.uploadStatus.progress = event.percent;
                if (event.status === UploadStatus.Completed) {
                    photo.file = event.data;
                }
            },
            (err) => {
            },
            () => {
                photo.uploadStatus.isUploading = false;
            });
    }

    // END


    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { animated: true, class: 'modal-sm' });
    }
    focusInput() {
        this.isFocus = true;
        this.settingsTooltipInfo.click = 'click';
    }

    ngOnInit() {
        this.postForm = new FormGroup({
            title: new FormControl(null, [Validators.required]),
            content: new FormControl(null, [Validators.required]),
            category: new FormControl(null),
            type: new FormControl(null),
            price: new FormControl(null),
            currency: new FormControl(null),
            // bargain: new FormGroup({ barg: new FormControl('') }),
            postCustomFields: new FormControl(null)
        });
    }


    selectedCategory(item) {
        this.selectedCategories = item.array;
        if (item.hideModal === true) {
            this.modalRef.hide();
            this.isShowSelectRubrics = false;
        }
        this.postForm.controls.category.setValue(item.itemCategory.id);
        this.fields = item.itemCategory.customFields;
    }


    getFields() {
        return this.fields;
    }

    onSubmit() {
        // this.postService.new(this.postForm.value).subscribe(data => {
        //     this.onClose.emit();
        //     this.attachPhotosToPost(data.id).subscribe(data => {
        //         console.log(data);
        //     });
        // }, (err) => {
        //     this.modalRef.hide();
        // });

        const payload = this.postForm.getRawValue();
        console.log(payload);
        // можно тут при сабмите сразу
        this.loadingPostCreate = true;
        this.createPost(payload);
    }

    attachPhotosToPost(postId: number): Observable<any> {

      const photos = this.photos.filter(i => i.file && i.file.id);
      return from(photos).pipe(
          concatMap(file => this.postService.attachPostFile(postId, file.file.id)));
    }

    getCustomFields(data: any) {
        const postCustomFields = [];
        // tslint:disable-next-line: forin
        for (const key in data) {
            postCustomFields.push({ value: data[key], customField: key });
        }
        this.postForm.controls.postCustomFields.setValue(postCustomFields);
    }

    createPost(data: any) {
        this.postService.new(this.postForm.value)
            .pipe(
                tap(() => this.loadingPostCreate = true),
                concatMap(post => this.attachPhotosToPost(post.id)),
                takeUntil(this.ngOnDestroy$) // должен быть последним, отписка!
            )
            .subscribe({
              complete: () => {
                this.loadingPostCreate = false;
                this.onClose.emit();
              }
            });
    }

    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();
    }

}
