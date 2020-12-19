import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CARDS } from "../../cards";
import { Card } from '../Card';


@Component({
  selector: 'memo-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit {
  @Input() gameMode: number;
  @Input() nbOfCards: number;
  @Input() maxFlipCount: number;
  @Output() onGameEnd = new EventEmitter<any>();
  flipCount: number = 0;
  cards: Card[] = [];

  constructor() { }

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

  finishGame(isWon: boolean): void {
    if (isWon) {
      console.log("game won");
      this.onGameEnd.emit({
        flipCount: this.flipCount,
        winner: 1, // only works for solo mode rn
        // pairsFound only for 2 player mode
      });

    } else {
      console.log("game lost");
      this.onGameEnd.emit({
        flipCount: null,
        winner: null, // only works for solo mode rn
        pairsFound: null
      });
    }
  }

  flipCard = (card: Card): void => {
    if (this.maxFlipCount === this.flipCount) {
      this.finishGame(false);
      return;
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
          this.finishGame(true);
        }
      } else {
        setTimeout(() => {
          this.unflipCards();
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
