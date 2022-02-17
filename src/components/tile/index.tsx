import * as React from 'react';

import _ from 'lodash';

type Props = {
  board: number[][];
  done: boolean;
  emptyTile: number;
  index: number;
  jigsaw: string;
  moveStack: React.MutableRefObject<number[][][] | null>;
  numMoves: React.MutableRefObject<number>;
  pos: number[];
  solution: number[][] | null;
  start: boolean;
  square: number;
  setBoard: React.Dispatch<React.SetStateAction<number[][] | null>>;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
};

/** Renders the Tile for a board */
export default function Tile({
  board,
  done,
  emptyTile,
  index,
  jigsaw,
  moveStack,
  numMoves,
  pos,
  solution,
  start,
  square,
  setBoard,
  setDone
}: Props): JSX.Element {
  const top = pos[0] * 100 + 5;
  const left = pos[1] * 100 + 5;
  const bgLeft = (index % square) * 100 + 5;
  const bgTop = Math.floor(index / square) * 100 + 5;

  const moveTile = React.useCallback(() => {
    if (!board || !moveStack.current) return;

    const tilePos = board[index];
    const emptyPos = board[emptyTile];

    let validMove = false;

    if (tilePos[0] === emptyPos[0])
      validMove = Math.abs(tilePos[1] - emptyPos[1]) === 1;
    else if (tilePos[1] === emptyPos[1])
      validMove = Math.abs(tilePos[0] - emptyPos[0]) === 1;

    const boardCopy = [...board];

    if (validMove) {
      const emptyPosition = [...board[emptyTile]];
      const tilePosition = [...board[index]];

      boardCopy[emptyTile] = tilePosition;
      boardCopy[index] = emptyPosition;

      numMoves.current += 1;

      moveStack.current.push(board);
    }

    if (_.isEqual(boardCopy, solution)) {
      setDone(true);
    }

    setBoard(boardCopy);
  }, [
    board,
    emptyTile,
    index,
    moveStack,
    numMoves,
    solution,
    setBoard,
    setDone
  ]);

  return (
    <button
      type="button"
      aria-label="move-tile"
      className="tile"
      onClick={moveTile}
      disabled={done || !start}
      style={{
        top,
        left,
        background: `url(${jigsaw})`,
        backgroundPosition: `-${bgLeft}px -${bgTop}px`
      }}
    />
  );
}
