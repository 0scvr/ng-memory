import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memo-info-board',
  templateUrl: './info-board.component.html',
  styles: [
    '.options-panel {display: flex; flex-direction: column;}',
    '.game-panel {display: flex; flex-direction: column;}',
    'label {display: block;}'
  ]
})
export class InfoBoardComponent implements OnInit {
  isGameStarted: boolean;
  gridSize: number;
  sliderMin: number;
  sliderMax: number;
  sliderValue: number;
  gameMode: number; // 1: solo; 2: multiplayer;

  constructor() { }

  ngOnInit(): void {
    this.isGameStarted = false;
    this.gameMode = 1;
    this.gridSize = 9;
    this.updateSliderValues();

  }

  startGame(): void {
    console.log("Game is loading..");
    this.isGameStarted = true;
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
