import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownListItem, DisplayType } from '../../../models/dropdown-list-item';
import { LANGUAGES_SUPPORTED, LanguageSupported } from '../../../../../i18n/LanguagesSupported';
import { ConfigService } from '../../../../core/services/config/config.service';
import { i18nMessages } from '../../../../core/services/i18n/i18n.config';


@Component({
  selector: 'app-user-dropdown',
  templateUrl: 'user-dropdown.component.html',
  styleUrls: ['user-dropdown.component.scss']
})
export class UserDropDownComponent implements OnInit, OnDestroy {

  public dropDownItems: DropdownListItem[] = [];
  public dropDownItemSignout: DropdownListItem;
  public dropDownItemsUserGuide: DropdownListItem;
  public dropdownLanguages: DropdownListItem;

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    private config: ConfigService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dropdownInit();
  }

  ngOnDestroy() {

  }

  dropdownInit(): void {

    this.dropDownItemSignout = {
      name: i18nMessages.userDropdownMenu.signOut,
      key: '#signout',
      displayType: DisplayType.text
    };

    this.dropDownItemsUserGuide = {
      name: i18nMessages.userDropdownMenu.userGuide,
      key: '#userguide',
      displayType: DisplayType.text
    };

    this.dropdownLanguages = this.dropdownLanguanguageItemsGet();
  }

  signOut() {
    this.router.navigate([this.config.LOGIN_PAGE]);
  }

  dropdownLanguanguageItemsGet(): DropdownListItem {
    const languagesRoot = {
      name: i18nMessages.userDropdownMenu.languages,
      key: '#languages',
      displayType: DisplayType.text,
      childs: []
    };

    LANGUAGES_SUPPORTED
      .forEach((lang: LanguageSupported) => {
        if (lang.locale !== this.localeId) {
          languagesRoot.childs.push({
            name: lang.name,
            key: `#languages#${lang.locale}`,
            displayType: DisplayType.link,
            icon: lang.icon,
            href: `../${lang.locale}/index.html`
          } as DropdownListItem);
        }
      });

    return languagesRoot;
  }
}
