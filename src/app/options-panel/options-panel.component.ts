import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameOptions } from '../GameOptions';

@Component({
  selector: 'memo-options-panel',
  templateUrl: './options-panel.component.html',
  styles: [
    'form {display:flex; flex-direction:column;}'
  ]
})
export class OptionsPanelComponent {
  optionsForm: GameOptions = {
    gameMode: "1",
    gridSize: "4",
    maxFlipCount: 4,
    player1: "",
  };
  @Output() optionsFormToParent = new EventEmitter<GameOptions>();

  constructor() { }

  submitForm(): void {
    this.optionsFormToParent.emit(this.optionsForm);
  }

}
