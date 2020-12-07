import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'memo-endgame-dialog',
  template: `
  <h2 mat-dialog-title>C'est gagné!</h2>
  <mat-dialog-content class="mat-typography">
    Tu as gagné en {{data.flipCount}} coups.
  </mat-dialog-content>
  <mat-dialog-actions align="center">
    <button mat-button mat-dialog-close>Rejouer</button>
  </mat-dialog-actions>
  `,
  styles: []
})
export class EndGameDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { flipCount: number }) { }

  ngOnInit(): void {
  }

}
