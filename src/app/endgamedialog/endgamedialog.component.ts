import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memo-endgame-dialog',
  template: `
  <!-- <h2 mat-dialog-title>C'est gagné!</h2>
  <mat-dialog-content class="mat-typography">
    Tu as gagné en {{data.flipCount}} coups.
  </mat-dialog-content>
  <mat-dialog-actions align="center">
    <button mat-button mat-dialog-close>Rejouer</button>
  </mat-dialog-actions> -->
  `,
  styles: []
})
export class EndGameDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
