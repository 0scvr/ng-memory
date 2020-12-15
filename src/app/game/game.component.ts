import { Component, Input, OnInit } from '@angular/core';
import { CARDS } from "../../cards";
import { EndGameDialogComponent } from '../endgamedialog/endgamedialog.component';
import { FirebaseService } from '../firebase.service';

type Card = { image: string, isFlipped: boolean, isFound: boolean };
@Component({
  selector: 'memo-game',
  templateUrl: './game.component.html',
  styles: [
    'mat-grid-tile {background-color: #4797b1; border-radius: 10px;}',
    '.card-image {align-self: stretch; height: auto;}',
    '.game-grid {width:70%; margin: 0 auto;}',
  ]
})
export class GameComponent implements OnInit {
  cards: Card[] = [];
  @Input() nbOfCards: number;
  @Input() maxFlipCount: number;
  flipCount: number = 0;
  constructor(public db: FirebaseService) { }

  ngOnInit(): void {
    this.resetGame();
  }

  getGridWidth(): number {
    return Math.sqrt(this.nbOfCards);
  }


  resetGame = (): void => {
    this.cards = [];
    this.flipCount = 0;

    let imageIndexes: number[] = this.getRandomImagesIndexes();

    let cardList = imageIndexes.map((index) => {
      return {
        image: '../assets/images/' + CARDS[index],
        isFlipped: false,
        isFound: false,

      }
    });

    this.cards = this.shuffleCards(cardList);
  }

  openEndGameDialog() {
    // const dialogRef = this.dialog.open(EndGameDialogComponent,
    //   { data: { flipCount: this.flipCount } });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.resetGame();
    // });
  }

  flipCard = (card: Card): void => {
    if (this.maxFlipCount === this.flipCount) {
      return;
      // lost the game
    }
    if (this.isTwoCardsFlipped()) {
      return;
    }

    card.isFlipped = true;
    this.flipCount += 1;

    if (this.isTwoCardsFlipped()) {
      if (this.checkFlippedCards()) {
        this.setFoundCards()

        if (this.isGameWon()) {
          //handle endgame
          this.db.saveGame({
            player: "oscar",
            player2: null,
            gridSize: 9,
            gameMode: 1,
            winner: 1,
            flipCount: this.flipCount,
            pairsFound: null,
          });
          this.openEndGameDialog();
        }
      } else {
        setTimeout(() => {
          this.unflipCards();
          console.log("cards unflipped");
        }, 600);
      }
    }
  }

  shuffleCards = (cards: Card[]): Card[] => {
    let shuffledCards = cards;
    for (let index = cards.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * index);
      const currentCard = shuffledCards[index];
      shuffledCards[index] = shuffledCards[randomIndex];
      shuffledCards[randomIndex] = currentCard;
    }
    return shuffledCards;
  }

  getRandomNumber = (min, max): number => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  getRandomImagesIndexes = (): number[] => {
    let imageIndexes: Set<number> = new Set();
    do {
      imageIndexes.add(this.getRandomNumber(1, 50));
    } while (imageIndexes.size < this.nbOfCards / 2);

    const array = Array.from(imageIndexes);

    return array.concat(array);
  };

  isTwoCardsFlipped = (): boolean => {
    return this.getFlippedCards().length == 2;
  }

  getFlippedCards = (): Card[] => {
    return this.cards.filter(card => !card.isFound && card.isFlipped)
  }

  unflipCards = (): void => {
    this.cards.forEach(card => { if (!card.isFound) { card.isFlipped = false } });
  }

  setFoundCards = (): void => {
    this.cards.map(card => {
      if (card.isFlipped) {
        card.isFound = true;
      }
    });
  }

  isGameWon = (): boolean => {
    return this.cards.every(card => card.isFound);
  }

  checkFlippedCards = (): boolean => {
    const flippedCards = this.getFlippedCards();
    if (flippedCards && flippedCards.length == 2) {
      return flippedCards[0].image === flippedCards[1].image;
    }

    return false;
  }
}
