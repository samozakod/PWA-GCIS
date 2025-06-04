import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import helpData from 'src/assets/data/helpTab.json';
@Component({
  selector: 'app-assist',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule],
  templateUrl: 'assist.page.html',
  styleUrls: ['assist.page.scss'],
})
export class AssistPage implements OnInit {
  contacts: any[] = [];

  constructor() {}

  ngOnInit() {
    this.contacts = helpData;
  }

  call(number: string) {
    window.open(`tel:${number}`, '_system');
  }
}
