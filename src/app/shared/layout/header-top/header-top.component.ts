import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store, Select } from '@ngxs/store';
import { Observable, map, tap, Subject, takeUntil} from 'rxjs';

import { AppLanguageState } from 'src/app/core/states/app-language.state';
import { ChangeAppLanguage } from 'src/app/core/actions/app-language.action';

@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectButtonModule
  ],
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnDestroy {
    langForm!: FormGroup;
    langOptions: {label:string, value: string}[] = [
        { label: 'Fr', value: 'fr' },
        { label: 'En', value: 'en' }
    ];

    @Select(AppLanguageState.language) lang$!: Observable<string>;

    private ngUnsubscribe:Subject<void> = new Subject<void>();

    private DEFAULT_LANG_VALUE = 'en'; 

    constructor(private fb: FormBuilder, private _translate: TranslateService, private store: Store) { }

    ngOnInit() {
      this.initDefaultLang();
    }

    buildForm(language:string|undefined): void {
      this.langForm = this.fb.group({
        lang: [language]
      });
    }

    onChangeLang($event: any) {
      const newLang = this.langIsUsed($event.value as string) ? $event.value : this.DEFAULT_LANG_VALUE;
      this.store.dispatch(new ChangeAppLanguage(newLang));
    }
    
    private initDefaultLang() {
      this.lang$.pipe(
        map((currentLang: string) => this.langIsUsed(currentLang as string) ? currentLang : this.DEFAULT_LANG_VALUE),
        tap((newLang:string) => {
          this._translate.use(newLang);
          this.buildForm(newLang as string);
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe();
    }

    private langIsUsed(lang: string) {
      return this.langOptions.map(({ value }) => value).includes( lang as string);
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }

}
