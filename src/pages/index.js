import * as React from 'react';

import Jigsaw3x3 from '../components/Jigsaw3x3';
import Jigsaw4x4 from '../components/Jigsaw4x4';
import SearchEngineOptimization from '../components/SearchEngineOptimization';

export default function Home() {
  const [difficulty, setDifficulty] = React.useState('');

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <main className="grid grid-cols-1">
        {!difficulty ? (
          <>
            <p className="text-xl text-center">Choose a difficulty level...</p>
            <div className="grid grid-cols-2">
              <button
                className="game-mode"
                onClick={() => setDifficulty('3x3')}
              >
                3x3
              </button>
              <button
                className="game-mode"
                onClick={() => setDifficulty('4x4')}
              >
                4x4
              </button>
            </div>
          </>
        ) : (
          <>{difficulty === '3x3' ? <Jigsaw3x3 /> : <Jigsaw4x4 />}</>
        )}
      </main>
    </>
  );
}
