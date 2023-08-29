import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { HttpClientModule, HttpBackend, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule, LOCAL_STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderTopComponent } from './shared/layout/header-top/header-top.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';
import { JwtInterceptor } from 'src/app/core/interceptors/jwt.interceptor';
import { RefreshJwtInterceptor } from 'src/app/core/interceptors/refresh-jwt.interceptor';
import { TruncatePipe } from 'src/app/core/pipes/truncate.pipe';

import { AuthState } from 'src/app/core/states/auth.state';
import { LoadingState } from 'src/app/core/states/loading.state';
import { AppLanguageState } from 'src/app/core/states/app-language.state';

function HttpLoaderFactory(http: HttpBackend) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/shared/', suffix: '.json'},
    {prefix: './assets/i18n/login/', suffix: '.json'},
    {prefix: './assets/i18n/core/', suffix: '.json'},
    {prefix: './assets/i18n/todo/', suffix: '.json'},
  ]);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
    NgxsModule.forRoot([AuthState, LoadingState, AppLanguageState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot(
      { 
        key: [
          { key: AuthState, engine: LOCAL_STORAGE_ENGINE},
          { key: AppLanguageState, engine: LOCAL_STORAGE_ENGINE}
      ]
    }),
    ToastModule,
    HeaderTopComponent,
    HeaderComponent,
    LoaderComponent,
    TruncatePipe
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshJwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
