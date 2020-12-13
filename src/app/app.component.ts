import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


enum GameStatus {
  NotStarted,
  Started,
  Won,
  Lost
}

@Component({
  selector: 'memo-root',
  templateUrl: './app.component.html',
  styles: [
    '.container {display: flex; flex-direction: row; height: 100vh;}',
    '.left-col { margin: 0; flex-grow: 0.45; background-color: #f1faee;}',
    '.right-col { margin: 0 auto; flex-grow: 1; background-color: #295e6a;}',
    '.options-panel {display: flex; flex-direction: column;}',
    '.game-panel {display: flex; flex-direction: column;}',
    'label {display: block;}',
    '.gameGrid {width: 100px; height:100px; background-color: blue;}'
  ]
})

export class AppComponent implements OnInit {
  public GameStatus: any = GameStatus;
  gameStatus: GameStatus;
  gridSize: number;
  sliderMin: number;
  sliderMax: number;
  sliderValue: number;
  gameMode: number; // 1: solo; 2: multiplayer;
  player1: string;
  player2: string;

  constructor(public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.gameStatus = GameStatus.NotStarted;
    this.gridSize = 4;
    this.gameMode = 1;
    this.updateSliderValues();
    this.firestore.collection("games").add({ flipCount: 22 }).then(() => console.log("new game saved"));
  }

  getCurrentPlayer(): string {
    if (this.gameMode === 2) {
      return "Joueur 1";
    }
  }

  startGame(): void {
    this.gameStatus = GameStatus.Started;
  }

  updateGameModeValue(ev): void {
    this.gameMode = ev.value;
  }

  updateGridSizeValue(ev): void {
    this.gridSize = ev.value;
    this.updateSliderValues();
  }

  updateSliderValues(): void {
    this.sliderMin = this.gridSize;
    this.sliderMax = this.gridSize * this.gridSize;
    this.sliderValue = this.gridSize;
  }

  updateSliderValue(ev): void {
    this.sliderValue = ev.value;
  }
}
