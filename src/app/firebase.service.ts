import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import Game from './game.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  gamesRef: AngularFirestoreCollection<Game>

  constructor(private db: AngularFirestore) {
    this.gamesRef = db.collection('games');
  }

  getHistory() {
    return this.gamesRef.get();
  }

  saveGame(game): void {
    this.gamesRef.add({ ...game, createdAt: firebase.default.firestore.Timestamp.now() })
      .then(() => console.log("game saved"))
      .catch(() => console.log("error"))
  }
}
