import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memo-options-panel',
  templateUrl: './options-panel.component.html',
  styles: [
    'form {display:flex; flex-direction:column;}'
  ]
})
export class OptionsPanelComponent implements OnInit {
  optionsForm: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  startGame(): void {
    console.log(this.optionsForm);
  }

}
