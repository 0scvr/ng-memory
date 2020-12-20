import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'memo-history-table',
  templateUrl: './history-table.component.html',
  styles: [
  ]
})
export class HistoryTableComponent implements OnInit {
  pastGames$: Observable<any>

  constructor(private db: FirebaseService) { }

  ngOnInit(): void {
    this.pastGames$ = this.db.getHistory();

  }

  displayGameMode(mode: number) {
    if (mode == 1) {
      return "1 joueur";
    } else {
      return "2 joueurs";
    }
  }

  displayWinner(game: any) {
    console.log(game);

    if ((game.gameMode == 1 || game.gameMode == 2) && game.winner == 1) {
      return "Joueur 1";
    } else if (game.gameMode == 2 && game.winner == 1) {
      return "Joueur 1";
    } else if (game.gameMode == 2 && game.winner == 2) {
      return "Joueur 2";
    } else {
      return "Perdu";
    }
  }
}