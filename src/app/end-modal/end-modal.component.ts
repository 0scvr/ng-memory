import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'memo-end-modal',
  templateUrl: './end-modal.component.html',
  styles: [
  ]
})
export class EndModalComponent implements OnInit {
  @Input() flipCount: number | null = null;
  @Input() pairsFound: number | null = null;
  @Input() gameMode: string;
  @Input() isWon: boolean | null = null;
  @Input() winner: string | null = null;
  @Output() onEndBtnClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  quit(): void {
    this.onEndBtnClick.emit("playAgain");
  }

  playAgain(): void {
    this.onEndBtnClick.emit("quit");
  }

}
