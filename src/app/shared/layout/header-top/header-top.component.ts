import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
export class HeaderTopComponent {
    langForm!: FormGroup;
    langOptions: any[] = [
        { label: 'Fr', value: 'fr' },
        { label: 'En', value: 'en' }
    ];

    private STORAGE_KEY_LANG = '_lang';
    private DEFAULT_LANG_VALUE = 'en';

    constructor(private fb: FormBuilder, private _translate: TranslateService) { }

    ngOnInit() {
      const lang = this.getDefaultLang();
      this.setAppLanguage(lang as string);
      this.buildForm(lang as string);
    }

    buildForm(language:string|undefined): void {
      this.langForm = this.fb.group({
        lang: [language ?? this.getDefaultLang()]
      });
    }

    onChangeLang($event: any) {
      const newLang = this.langIsUsed($event.value as string) ? $event.value : this.DEFAULT_LANG_VALUE;
      this.setAppLanguage(newLang);
    }

    private setAppLanguage(lang: string) {
      this._translate.use(lang);
      localStorage.setItem(this.STORAGE_KEY_LANG, lang);
    }

    private getDefaultLang() {
      const saveLang = localStorage.getItem(this.STORAGE_KEY_LANG);
      
      return this.langIsUsed(saveLang as string) ? saveLang : this.DEFAULT_LANG_VALUE;
    }

    private langIsUsed(lang: string) {
      return this.langOptions.map(({ value }) => value).includes( lang as string);
    }

}
