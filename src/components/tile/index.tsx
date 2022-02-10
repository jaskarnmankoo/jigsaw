import * as React from 'react';

type Props = {
  index: number;
  jigsaw: string;
  pos: number[];
  onClick: () => void;
};

export default function Tile({
  index,
  jigsaw,
  pos,
  onClick
}: Props): JSX.Element {
  const top = pos[0] * 100 + 5;
  const left = pos[1] * 100 + 5;
  const bgLeft = (index % 3) * 100 + 5;
  const bgTop = Math.floor(index / 3) * 100 + 5;

  return (
    <button
      aria-label="move-tile"
      className="tile"
      onClick={onClick}
      style={{
        top,
        left,
        background: `url(${jigsaw})`,
        backgroundPosition: `-${bgLeft}px -${bgTop}px`
      }}
    />
  );
}
