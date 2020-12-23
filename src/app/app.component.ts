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
  gameDetails: any;
  hasGameStarted: boolean;
  hasGameEnded: boolean;
  currentFlipCount: number;

  constructor(private db: FirebaseService) { }

  ngOnInit(): void {
    this.hasGameStarted = false;
    this.hasGameEnded = false;
    this.gameDetails = {};
  }

  initGame(gameOptions: GameOptions): void {
    console.log(gameOptions);
    this.gameOptions = gameOptions;
    this.hasGameStarted = true;
  }

  handleDialogClose(action: string) {
    if (action === "playAgain") {
      console.log("play again");

    } else {
      console.log("quit");

    }
  }

  handleEndGame(gameData: any) {
    this.hasGameEnded = true;
    this.saveGame(gameData);

    this.gameDetails = {
      flipCount: gameData.flipCount || null,
      pairsFound: gameData.pairsFound || null,
      gameMode: this.gameOptions.gameMode,
      isWon: gameData.winner == 1 && this.gameOptions.gameMode == '1',
      winner: this.gameOptions.gameMode == '2' && (gameData.winner == 1 ? this.gameOptions.player1 : this.gameOptions.player2) || null
    };
  }

  saveGame(gameData: any): void {
    this.db.saveGame({
      ...gameData,
      player: this.gameOptions.player1,
      player2: (this.gameOptions.gameMode == "2" ? this.gameOptions.player2 : null),
      gridSize: this.gameOptions.gridSize,
      gameMode: this.gameOptions.gameMode,
    });
  }

  updateFlipCount(count: number) {
    this.currentFlipCount = count;
  }
}
