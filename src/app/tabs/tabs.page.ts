import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  isDarkMode = false;
  isLargeFont = false;
  selectedLanguage = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    const savedDark = localStorage.getItem('dark-mode');
    const savedFont = localStorage.getItem('large-font');

    this.isDarkMode = savedDark === 'true';
    this.isLargeFont = savedFont === 'true';

    this.setDarkMode(this.isDarkMode);
    this.setFontSize(this.isLargeFont);

    this.selectedLanguage = localStorage.getItem('lang') || 'en';
    this.translate.use(this.selectedLanguage);
  }

  toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    this.setDarkMode(this.isDarkMode);
    localStorage.setItem('dark-mode', this.isDarkMode.toString());
  }

  setDarkMode(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }

  toggleFontSize(event: any) {
    this.isLargeFont = event.detail.checked;
    this.setFontSize(this.isLargeFont);
    localStorage.setItem('large-font', this.isLargeFont.toString());
  }

  setFontSize(enableLarge: boolean) {
    document.body.classList.toggle('large-font', enableLarge);
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}