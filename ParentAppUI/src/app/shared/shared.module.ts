import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
@NgModule({
  imports: [
    CKEditorModule,
    RxReactiveFormsModule
  ],
  declarations: [ 
  ],

  exports: [
    CKEditorModule
  ]

})
export class SharedModule { }
