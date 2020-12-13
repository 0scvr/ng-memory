import { Injectable } from '@angular/core';

enum GameStatus {
  NotStarted,
  Started,
  Won,
  Lost
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  gameStatus: GameStatus;

  constructor() { }


  getGameStatus(): GameStatus {
    return this.gameStatus;
  }

}
