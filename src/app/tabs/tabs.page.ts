import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  isDarkMode = false;
  isLargeFont = false;

  constructor() {}

  ngOnInit() {
    const savedDark = localStorage.getItem('dark-mode');
    const savedFont = localStorage.getItem('large-font');

    this.isDarkMode = savedDark === 'true';
    this.isLargeFont = savedFont === 'true';

    this.setDarkMode(this.isDarkMode);
    this.setFontSize(this.isLargeFont);
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
}