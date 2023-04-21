import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import {
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    GoogleSigninButtonModule,
    RouterModule,
  ],
  declarations: [PageNotFoundComponent, WebviewDirective, ToolbarComponent],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ReactiveFormsModule,
    ToolbarComponent,
    GoogleSigninButtonDirective,
  ],
})
export class SharedModule {}
