import { IonicModule, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

import eventData from 'src/assets/data/events.json';

@Component({
  selector: 'app-entertain',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
  templateUrl: 'entertain.page.html',
  styleUrls: ['entertain.page.scss'],
})
export class EntertainPage {
  categories = (eventData as any).categories;

  constructor(
    private alertController: AlertController,
    private translate: TranslateService
  ) {}

    /*Parsed data translation and alert implementation, for on-click item behaviour*/
    async presentItemDetails(item: any) {
      const title = this.translate.instant(item.title);
      const message = this.translate.instant(item.longDescription);
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: [this.translate.instant('ui.close')]
      });
      await alert.present();
    }
}
