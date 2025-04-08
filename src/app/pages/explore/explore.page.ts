import { Component } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonContent, IonButton } from '@ionic/angular/standalone';  // Import required Ionic components

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss'],
  imports: [IonCol, IonGrid, IonRow, IonContent, IonButton],  // Add Ionic components here
  standalone: true,
})
export class ExplorePage {
  constructor() {}
}
