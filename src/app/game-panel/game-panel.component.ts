import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'memo-game-panel',
  templateUrl: './game-panel.component.html',
  styles: [
  ]
})
export class GamePanelComponent implements OnInit {
  @Input() player1: string;
  @Input() player2: string | null;
  @Input() gameMode: string;
  @Input() flipCount: number;
  @Input() maxFlipCount: number;

  constructor() { }

  ngOnInit(): void {
  }

  displayGameMode(mode: string) {
    if (mode == "1") {
      return "1 joueur";
    } else {
      return "2 joueurs";
    }
  }

}
