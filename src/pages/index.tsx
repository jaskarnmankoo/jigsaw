import * as React from 'react';

import _ from 'lodash';

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

/** Renders the home page with difficulty selection */
export default function Home(): JSX.Element {
  const [board, setBoard] = React.useState<number[][] | null>(null);
  const [difficulty, setDifficulty] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [start, setStart] = React.useState(false);

  const emptyTile = React.useRef(0);
  const moveStack = React.useRef<number[][][] | null>(null);
  const numMoves = React.useRef(0);
  const solution = React.useRef<number[][] | null>(null);
  const square = React.useRef(3);

  const jigsaw = React.useRef('');
  const size = React.useRef(300);

  const moveTile = React.useCallback(
    (index: number) => {
      if (!board || !moveStack.current) return;

      const tilePos = board[index];
      const emptyPos = board[emptyTile.current];

      let validMove = false;

      if (tilePos[0] === emptyPos[0])
        validMove = Math.abs(tilePos[1] - emptyPos[1]) === 1;
      else if (tilePos[1] === emptyPos[1])
        validMove = Math.abs(tilePos[0] - emptyPos[0]) === 1;

      const boardCopy = [...board];

      if (validMove) {
        const emptyPosition = [...board[emptyTile.current]];
        const tilePosition = [...board[index]];

        boardCopy[emptyTile.current] = tilePosition;
        boardCopy[index] = emptyPosition;

        numMoves.current += 1;

        moveStack.current.push(board);
      }

      if (_.isEqual(boardCopy, solution.current)) {
        setDone(true);
      }

      setBoard(boardCopy);
    },
    [board]
  );

  const shuffle = React.useCallback(() => {
    if (!board) return;

    const boardCopy = [...board];
    boardCopy.sort(() => Math.random() - 0.5);
    setBoard(boardCopy);

    setStart(true);
  }, [board]);

  const startGame3x3 = React.useCallback(() => {
    jigsaw.current = puzzles3x3[rand(0, 5)];
    size.current = 300;

    numMoves.current = 0;
    square.current = 3;
    emptyTile.current = square.current ** 2 - 1;
    moveStack.current = [];

    const generatedBoard = [];
    for (let i = 0; i < square.current ** 2; i++) {
      generatedBoard.push([Math.floor(i / square.current), i % square.current]);
    }
    solution.current = generatedBoard;
    setBoard(generatedBoard);

    setDifficulty('3x3');
  }, []);

  const startGame4x4 = React.useCallback(() => {
    jigsaw.current = puzzles4x4[rand(0, 5)];
    size.current = 400;

    numMoves.current = 0;
    square.current = 4;
    emptyTile.current = square.current ** 2 - 1;
    moveStack.current = [];

    const generatedBoard = [];
    for (let i = 0; i < square.current ** 2; i++) {
      generatedBoard.push([Math.floor(i / square.current), i % square.current]);
    }
    solution.current = generatedBoard;
    setBoard(generatedBoard);

    setDifficulty('4x4');
  }, []);

  const undo = React.useCallback(() => {
    if (!moveStack.current) return;
    if (moveStack.current.length === 0) return;

    const boardCopy = moveStack.current.pop();

    if (!boardCopy) return;

    setBoard(boardCopy);
  }, []);

  const playAgain = React.useCallback(() => window.location.reload(), []);

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
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-3">
                <p className="self-center text-xl">
                  Move count: {numMoves.current}
                </p>
                {!start && (
                  <button type="button" className="game-mode" onClick={shuffle}>
                    Start
                  </button>
                )}
                {start && (
                  <button
                    type="button"
                    className="game-mode"
                    onClick={undo}
                    disabled={done}
                  >
                    UNDO
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 justify-items-center">
                {board && (
                  <div className={`board${difficulty} relative`}>
                    {board.slice(0, -1).map((pos, index) => (
                      <React.Fragment key={`tile ${String(pos)}`}>
                        <Tile
                          done={done}
                          jigsaw={jigsaw.current}
                          index={index}
                          pos={pos}
                          start={start}
                          square={square.current}
                          onClick={() => moveTile(index)}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                )}
                {done && (
                  <button
                    type="button"
                    className="game-mode"
                    onClick={playAgain}
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
                src={jigsaw.current}
                alt=""
                width={size.current}
                height={size.current}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
