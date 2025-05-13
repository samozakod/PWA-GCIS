import { Component } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonContent, IonButton } from '@ionic/angular/standalone';  // Import required Ionic components
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from 'src/app/components/map-modal/map-modal.component';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss'],
  imports: [IonCol, IonGrid, IonRow, IonContent, IonButton],  // Add Ionic components here
  standalone: true,
})
export class ExplorePage {
  constructor(private modalCtrl: ModalController) {}

async openMap(mapType: string) {
  const modal = await this.modalCtrl.create({
    component: MapModalComponent,
    componentProps: { mapType },
    cssClass: 'fullscreen-modal',
    showBackdrop: true,
    backdropDismiss: false,
    handle: false,
  });

  await modal.present();
}
}