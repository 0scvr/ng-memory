import { Component, Input } from '@angular/core';

@Component({
  selector: 'memo-card',
  templateUrl: './card.component.html',
  styles: [
    'article { max-width: 100px; height: 100px;}'
  ]
})
export class CardComponent {
  @Input() imageSrc: string;
  @Input() isFlipped: boolean;

  constructor() { }
}
