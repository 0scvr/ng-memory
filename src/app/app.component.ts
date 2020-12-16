import { Component, OnInit } from '@angular/core';
import { GameOptions } from './GameOptions';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'memo-root',
  templateUrl: './app.component.html',
  styles: [
  ]
})

export class AppComponent implements OnInit {
  gameOptions: GameOptions;
  hasGameStarted: boolean;

  constructor(private db: FirebaseService) { }

  ngOnInit(): void {
    this.hasGameStarted = false;
  }

  initGame(gameOptions: GameOptions): void {
    console.log(gameOptions);
    this.gameOptions = gameOptions;
    this.hasGameStarted = true;
  }

  saveGame(gameData: any): void {
    this.db.saveGame({
      ...gameData,
      player: this.gameOptions.player1,
      player2: this.gameOptions.player2 || null,
      gridSize: this.gameOptions.gridSize,
      gameMode: this.gameOptions.gameMode,
    });
  }
}
