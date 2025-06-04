import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit, AfterViewInit {

  /*Variable declaration for option storage and propagation*/
  isDarkMode = false;
  isLargeFont = false;
  selectedLanguage = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    /*Logic and values to be followed on app launch*/
    const savedDark = localStorage.getItem('dark-mode');
    const savedFont = localStorage.getItem('large-font');

    this.isDarkMode = savedDark === 'true';
    this.isLargeFont = savedFont === 'true';

    this.setDarkMode(this.isDarkMode);
    this.setFontSize(this.isLargeFont);

    this.selectedLanguage = localStorage.getItem('lang') || 'en';
    this.translate.use(this.selectedLanguage);

   
  }

  /*Function to offset an error leading to sometimes having an empty language field on launch*/
   ngAfterViewInit() {
    const storedLang = localStorage.getItem('lang') || 'en';
    this.selectedLanguage = storedLang;
    this.translate.use(storedLang);
  }

  /*Dark mode functions*/
  toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    this.setDarkMode(this.isDarkMode);
    localStorage.setItem('dark-mode', this.isDarkMode.toString());
  }

  setDarkMode(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }

  /*Large Font functions*/
  toggleFontSize(event: any) {
    this.isLargeFont = event.detail.checked;
    this.setFontSize(this.isLargeFont);
    localStorage.setItem('large-font', this.isLargeFont.toString());
  }

  setFontSize(enableLarge: boolean) {
    document.body.classList.toggle('large-font', enableLarge);
  }

  /*Localization function*/
  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}