import { IonicModule, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import eventData from 'src/assets/data/events.json';

@Component({
  selector: 'app-entertain',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: 'entertain.page.html',
  styleUrls: ['entertain.page.scss'],
})
export class EntertainPage {
  categories = (eventData as any).categories;

  constructor(
    private alertController: AlertController,
  ) {}

    async presentItemDetails(item: any) {
  const message = `
    ${item.largeImage ? `<img src="${item.largeImage}" style="width: 100%; height: auto; margin-bottom: 10px;">` : ''}
    <p>${item.longDescription || item.description || ''}</p>
  `;

    const alert = await this.alertController.create({
      header: item.title,
      message: `${item.longDescription || item.description || ''}`,
      buttons: ['Close']
    });

  await alert.present();
}
}
