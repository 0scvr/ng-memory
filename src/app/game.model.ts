export default class Game {
    createdAt: firebase.default.firestore.Timestamp;
    player: string;
    player2: string | null;
    gridSize: number;
    gameMode: number;
    winner: number | null;
    flipCount: number | null;
    pairsFound: number | null;
}
