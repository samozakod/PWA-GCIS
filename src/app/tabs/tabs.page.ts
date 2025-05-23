import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  isDarkMode = false;

  constructor() {}

  // Check system preference for light-dark mode
  // ngOnInit() {
  //   // Check localStorage or system preference on startup
  //   const savedDark = localStorage.getItem('dark-mode') === 'true';
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  //   this.isDarkMode = savedDark || prefersDark;
  //   this.setDarkMode(this.isDarkMode);
  // }



  ngOnInit() {
  const savedDark = localStorage.getItem('dark-mode');

  // Default to light mode (false) if nothing is saved
  this.isDarkMode = savedDark === 'true';
  this.setDarkMode(this.isDarkMode);
}


  toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    this.setDarkMode(this.isDarkMode);
    localStorage.setItem('dark-mode', this.isDarkMode.toString());
  }

  setDarkMode(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
