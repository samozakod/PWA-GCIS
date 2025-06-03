import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
  const savedLang = localStorage.getItem('lang') || 'en';
  this.translate.setDefaultLang('en');
  this.translate.use(savedLang);
}
}
