import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { LanguageSupported, LANGUAGES_SUPPORTED } from './../../../i18n/LanguagesSupported';


@Component({
  selector: 'app-i18n-sample',
  templateUrl: './i18n-sample.component.html',
  styleUrls: ['./i18n-sample.component.css']
})
export class I18nSampleComponent implements OnInit {

  public languages: any[];
  public aNumber: number;

  constructor( @Inject(LOCALE_ID) public localeId: string) { }

  ngOnInit() {
    this.aNumber = 1234567.89;
    this.languages = LANGUAGES_SUPPORTED.map((lang: LanguageSupported) => {
      return { code: lang.locale, label: lang.name };
    });
  }

}
