import { Component } from '@angular/core';
import { trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomePage {
  currentFrame = 1;
  setFrame(index: number) {
    this.currentFrame = index;
  }
  constructor() {}

}
