import { Component } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonContent, IonButton } from '@ionic/angular/standalone'; 
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from 'src/app/components/map-modal/map-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss'],
  imports: [IonCol, IonGrid, IonRow, IonContent, IonButton, TranslateModule],
  standalone: true,
})
export class ExplorePage {
  constructor(private modalCtrl: ModalController) {}

/*Modal loading depending on the map type associated with the selected button*/
async openMap(mapType: string) {
  const modal = await this.modalCtrl.create({
    component: MapModalComponent,
    componentProps: { mapType },
    cssClass: 'map-modal',
    showBackdrop: true,
    backdropDismiss: true,
    handle: false,
  });

  await modal.present();
}
}