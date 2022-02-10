import * as React from 'react';

import SearchEngineOptimization from '../components/common/SearchEngineOptimization';
import Tile from '../components/tile';

import { rand } from '../utils';

import puzzleA3x3 from '../assets/3x3/puzzle1.jpg';
import puzzleB3x3 from '../assets/3x3/puzzle2.jpg';
import puzzleC3x3 from '../assets/3x3/puzzle3.jpg';
import puzzleD3x3 from '../assets/3x3/puzzle4.jpg';
import puzzleE3x3 from '../assets/3x3/puzzle5.jpg';
import puzzleF3x3 from '../assets/3x3/puzzle6.jpg';

import puzzleA4x4 from '../assets/4x4/puzzle1.jpg';
import puzzleB4x4 from '../assets/4x4/puzzle2.jpg';
import puzzleC4x4 from '../assets/4x4/puzzle3.jpg';
import puzzleD4x4 from '../assets/4x4/puzzle4.jpg';
import puzzleE4x4 from '../assets/4x4/puzzle5.jpg';
import puzzleF4x4 from '../assets/4x4/puzzle6.jpg';

const moves = ['up', 'down', 'left', 'right'];
const puzzles3x3 = [
  puzzleA3x3,
  puzzleB3x3,
  puzzleC3x3,
  puzzleD3x3,
  puzzleE3x3,
  puzzleF3x3
];
const puzzles4x4 = [
  puzzleA4x4,
  puzzleB4x4,
  puzzleC4x4,
  puzzleD4x4,
  puzzleE4x4,
  puzzleF4x4
];

export default function Home(): JSX.Element {
  const [difficulty, setDifficulty] = React.useState('');
  const [board, setBoard] = React.useState<number[][] | null>(null);
  const [jigsaw, setJigsaw] = React.useState('');

  const solvedBoard = React.useRef<number[][] | null>(null);
  const rows = React.useRef(3);
  const cols = React.useRef(3);
  const tiles = React.useRef(0);
  const emptyTile = React.useRef(0);

  const numMoves = React.useRef(0);
  const moveStack = React.useRef<number[][] | null>(null);

  const shuffling = React.useRef(false);

  const isSolved = React.useCallback(() => {
    if (!board || !solvedBoard.current) return;

    for (let i = 0; i < tiles.current; i++) {
      if (
        board[i][0] !== solvedBoard.current[i][0] ||
        board[i][1] !== solvedBoard.current[i][1]
      )
        return false;
    }
    return true;
  }, [board]);

  const canMoveTile = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= tiles.current || !board) return false;

      const tilePos = board[index];
      const emptyPos = board[emptyTile.current];

      if (tilePos[0] === emptyPos[0])
        return Math.abs(tilePos[1] - emptyPos[1]) === 1;
      else if (tilePos[1] === emptyPos[1])
        return Math.abs(tilePos[0] - emptyPos[0]) === 1;
      else return false;
    },
    [board]
  );

  const moveTile = React.useCallback(
    (index: number) => {
      if (!shuffling.current && isSolved()) return false;
      if (!canMoveTile(index) || !board || !moveStack.current) return false;

      const emptyPosition = [...board[emptyTile.current]];
      const tilePosition = [...board[index]];

      const boardAfterMove = [...board];
      boardAfterMove[emptyTile.current] = tilePosition;
      boardAfterMove[index] = emptyPosition;

      // if (!shuffling.current) moveStack.current.push(board.current);
      setBoard(boardAfterMove);
      if (!shuffling.current) numMoves.current++;

      return true;
    },
    [board, canMoveTile, isSolved]
  );

  const moveInDirection = React.useCallback(
    (direction: string) => {
      if (!board) return;

      const epos = board[emptyTile.current];
      const posToMove =
        direction === 'up'
          ? [epos[0] + 1, epos[1]]
          : direction === 'down'
          ? [epos[0] - 1, epos[1]]
          : direction === 'left'
          ? [epos[0], epos[1] + 1]
          : direction === 'right'
          ? [epos[0], epos[1] - 1]
          : epos;
      let tileToMove = emptyTile.current;
      for (let i = 0; i < tiles.current; i++) {
        if (board[i][0] === posToMove[0] && board[i][1] === posToMove[1]) {
          tileToMove = i;
          break;
        }
      }

      moveTile(tileToMove);
    },
    [board, moveTile]
  );

  const shuffle = React.useCallback(() => {
    shuffling.current = true;

    let shuffleMoves = rand(60, 80);

    while (shuffleMoves-- > 0) {
      moveInDirection(moves[rand(0, 3)]);
    }

    shuffling.current = false;
  }, [moveInDirection]);

  const startGame3x3 = React.useCallback(() => {
    setJigsaw(puzzles3x3[rand(0, 5)]);

    rows.current = 3;
    cols.current = 3;
    tiles.current = rows.current * cols.current;
    emptyTile.current = tiles.current - 1;

    numMoves.current = 0;
    moveStack.current = [];

    const generatedBoard = [];
    for (let i = 0; i < tiles.current; i++) {
      generatedBoard.push([Math.floor(i / rows.current), i % cols.current]);
    }
    setBoard(generatedBoard);
    solvedBoard.current = generatedBoard;

    shuffle();

    setDifficulty('3x3');
  }, [shuffle]);

  const startGame4x4 = React.useCallback(() => {
    setJigsaw(puzzles4x4[rand(0, 5)]);

    rows.current = 4;
    cols.current = 4;
    tiles.current = rows.current * cols.current;
    emptyTile.current = tiles.current - 1;

    numMoves.current = 0;
    moveStack.current = [];

    const generatedBoard = [];
    for (let i = 0; i < tiles.current; i++) {
      generatedBoard.push([Math.floor(i / rows.current), i % cols.current]);
    }
    setBoard(generatedBoard);
    solvedBoard.current = generatedBoard;

    shuffle();

    setDifficulty('4x4');
  }, [shuffle]);

  const undo = React.useCallback(() => {
    if (!moveStack.current || !board) return;
    if (moveStack.current.length === 0) return;

    moveStack.current.pop();
    setBoard(moveStack.current);
  }, [board]);

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <main className="grid grid-cols-1">
        {!difficulty ? (
          <>
            <p className="text-center text-xl">Choose a difficulty level...</p>
            <div className="grid grid-cols-2">
              <button
                type="button"
                className="game-mode"
                onClick={startGame3x3}
              >
                3x3
              </button>
              <button
                type="button"
                className="game-mode"
                onClick={startGame4x4}
              >
                4x4
              </button>
            </div>
          </>
        ) : (
          <>
            {board && (
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="grid grid-cols-1">
                  <div className="grid grid-cols-2">
                    <p className="self-center text-xl">
                      Move count: {numMoves.current}
                    </p>
                    <button className="game-mode" onClick={undo}>
                      UNDO
                    </button>
                  </div>
                  <div className="grid grid-cols-1 justify-items-center">
                    <div className="board3x3 relative">
                      {board.slice(0, -1).map((pos, index) => (
                        <React.Fragment key={`tile number ${pos}`}>
                          <Tile
                            jigsaw={jigsaw}
                            index={index}
                            pos={pos}
                            onClick={() => moveTile(index)}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                    {isSolved() && (
                      <button
                        className="game-mode"
                        onClick={
                          difficulty === '3x3' ? startGame3x3 : startGame4x4
                        }
                      >
                        Play Again?
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <p className="self-center text-center text-xl">Solution</p>
                  <img
                    className="justify-self-center"
                    src={jigsaw}
                    alt=""
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
