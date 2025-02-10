import { useEffect, useState } from 'react';
import './App.css';
import Cell from './components/cell.jsx';

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [cells, setCells] = useState(['', '', '', '', '', '', '', '', '']);
  const [go, setGo] = useState('X');
  const [winningMessage, setWinningMessage] = useState('');

  useEffect(() => {
    winningCombos.forEach((combo) => {
      const xWins = combo.every((cell) => cells[cell] === 'X');
      const oWins = combo.every((cell) => cells[cell] === 'O');

      if (xWins) {
        setWinningMessage('x wins!');
      } else if (oWins) {
        setWinningMessage('o wins!');
      }
    });
  }, [cells]);

  useEffect(() => {
    if (cells.every((cell) => cell !== '' && !winningMessage)) {
      setWinningMessage('Draw!');
    }
  }, [cells, winningMessage]);

  const restartGame = () => {
    setCells(['', '', '', '', '', '', '', '', '']);
    setGo('X');
    setWinningMessage('');
  };

  return (
    <div className="container">
      <div className="title">TIC-TAC-TOE</div>

      <div className={`gameboard ${winningMessage ? 'game-over' : ''}`}>
        {cells.map((cell, index) => {
          return (
            <Cell
              key={index}
              id={index}
              go={go}
              setGo={setGo}
              cells={cells}
              setCells={setCells}
              cell={cell}
              winningMessage={winningMessage}
            />
          );
        })}
      </div>

      <div className={`sub-container ${cells.find((cell) => cell !== '') ? 'game-started' : ''}`}>
        {winningMessage && <div>{winningMessage}</div>}

        {!winningMessage && <div>{`its now ${go.toLowerCase()} turn!`}</div>}
        {(winningMessage || cells.find((cell) => cell !== '')) && (
          <button className="restart-button" onClick={restartGame}>
            Restart
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
