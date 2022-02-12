import * as React from 'react';

type Props = {
  done: boolean;
  index: number;
  jigsaw: string;
  pos: number[];
  start: boolean;
  square: number;
  onClick: () => void;
};

export default function Tile({
  done,
  index,
  jigsaw,
  pos,
  start,
  square,
  onClick
}: Props): JSX.Element {
  const top = pos[0] * 100 + 5;
  const left = pos[1] * 100 + 5;
  const bgLeft = (index % square) * 100 + 5;
  const bgTop = Math.floor(index / square) * 100 + 5;

  return (
    <button
      type="button"
      aria-label="move-tile"
      className="tile"
      onClick={onClick}
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
