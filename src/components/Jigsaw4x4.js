import * as React from 'react';

import puzzleA from '../assets/4x4/puzzle1.jpg';
import puzzleB from '../assets/4x4/puzzle2.jpg';
import puzzleC from '../assets/4x4/puzzle3.jpg';
import puzzleD from '../assets/4x4/puzzle4.jpg';
import puzzleE from '../assets/4x4/puzzle5.jpg';
import puzzleF from '../assets/4x4/puzzle6.jpg';

const NUM_ROWS = 4;
const NUM_COLS = 4;
const NUM_TILES = NUM_ROWS * NUM_COLS;
const EMPTY_INDEX = NUM_TILES - 1;
const SHUFFLE_MOVES_RANGE = [60, 80];
const MOVE_DIRECTIONS = ['up', 'down', 'left', 'right'];
const puzzles = [puzzleA, puzzleB, puzzleC, puzzleD, puzzleE, puzzleF];
const toSolve = puzzles[rand(0, 5)];

function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

class GameState {
  static getNewBoard() {
    return Array(NUM_TILES)
      .fill(0)
      .map((x, index) => [Math.floor(index / NUM_ROWS), index % NUM_COLS]);
  }

  static solvedBoard = GameState.getNewBoard();
  static instance = null;

  static getInstance() {
    if (!GameState.instance) GameState.instance = new GameState();
    return GameState.instance;
  }

  constructor() {
    this.startNewGame();
  }

  isSolved() {
    for (let i = 0; i < NUM_TILES; i++) {
      if (
        this.board[i][0] !== GameState.solvedBoard[i][0] ||
        this.board[i][1] !== GameState.solvedBoard[i][1]
      )
        return false;
    }
    return true;
  }

  startNewGame() {
    this.moves = 0;
    this.board = GameState.getNewBoard();
    this.stack = [];
    this.shuffle();
  }

  shuffle() {
    this.shuffling = true;
    let shuffleMoves = rand(...SHUFFLE_MOVES_RANGE);
    while (shuffleMoves-- > 0) {
      this.moveInDirection(MOVE_DIRECTIONS[rand(0, 3)]);
    }
    this.shuffling = false;
  }

  canMoveTile(index) {
    if (index < 0 || index >= NUM_TILES) return false;

    const tilePos = this.board[index];
    const emptyPos = this.board[EMPTY_INDEX];
    if (tilePos[0] === emptyPos[0])
      return Math.abs(tilePos[1] - emptyPos[1]) === 1;
    else if (tilePos[1] === emptyPos[1])
      return Math.abs(tilePos[0] - emptyPos[0]) === 1;
    else return false;
  }

  moveTile(index) {
    if (!this.shuffling && this.isSolved()) return false;
    if (!this.canMoveTile(index)) return false;

    const emptyPosition = [...this.board[EMPTY_INDEX]];
    const tilePosition = [...this.board[index]];

    let boardAfterMove = [...this.board];
    boardAfterMove[EMPTY_INDEX] = tilePosition;
    boardAfterMove[index] = emptyPosition;

    if (!this.shuffling) this.stack.push(this.board);
    this.board = boardAfterMove;
    if (!this.shuffling) this.moves += 1;

    return true;
  }

  undo() {
    if (this.stack.length === 0) return false;
    this.board = this.stack.pop();
  }

  moveInDirection(dir) {
    const epos = this.board[EMPTY_INDEX];
    const posToMove =
      dir === 'up'
        ? [epos[0] + 1, epos[1]]
        : dir === 'down'
        ? [epos[0] - 1, epos[1]]
        : dir === 'left'
        ? [epos[0], epos[1] + 1]
        : dir === 'right'
        ? [epos[0], epos[1] - 1]
        : epos;
    let tileToMove = EMPTY_INDEX;
    for (let i = 0; i < NUM_TILES; i++) {
      if (
        this.board[i][0] === posToMove[0] &&
        this.board[i][1] === posToMove[1]
      ) {
        tileToMove = i;
        break;
      }
    }
    this.moveTile(tileToMove);
  }

  getState() {
    const self = this;
    return {
      board: self.board,
      moves: self.moves,
      solved: self.isSolved()
    };
  }
}

function useGameState() {
  const gameState = GameState.getInstance();
  const [state, setState] = React.useState(gameState.getState());

  function newGame() {
    gameState.startNewGame();
    setState(gameState.getState());
  }

  function undo() {
    gameState.undo();
    setState(gameState.getState());
  }

  function move(index) {
    return function () {
      gameState.moveTile(index);
      setState(gameState.getState());
    };
  }

  return [state.board, state.moves, state.solved, newGame, undo, move];
}

function Tile({ index, pos, onClick }) {
  const top = pos[0] * 100 + 5;
  const left = pos[1] * 100 + 5;
  const bgLeft = (index % 4) * 100 + 5;
  const bgTop = Math.floor(index / 4) * 100 + 5;

  return (
    <button
      aria-label="move-tile"
      className="tile"
      onClick={onClick}
      style={{
        top,
        left,
        background: `url(${toSolve})`,
        backgroundPosition: `-${bgLeft}px -${bgTop}px`
      }}
    />
  );
}

export default function Jigsaw4x4() {
  const [board, moves, solved, newGame, undo, move] = useGameState();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-2">
          <p className="text-xl self-center">Move count: {moves}</p>
          <button className="game-mode" onClick={undo}>
            UNDO
          </button>
        </div>
        <div className="grid grid-cols-1 justify-items-center">
          <div className="relative board4x4">
            {board.slice(0, -1).map((pos, index) => (
              <Tile index={index} pos={pos} onClick={move(index)} />
            ))}
          </div>
          {solved && (
            <button className="game-mode" onClick={newGame}>
              Play Again?
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1">
        <p className="text-xl text-center self-center">Solution</p>
        <img
          className="justify-self-center"
          src={toSolve}
          alt=""
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
