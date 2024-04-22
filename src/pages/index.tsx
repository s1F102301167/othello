import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    for (const direction of directions) {
      for (let i = 0; i < 8; i++) {
        if (
          board[y + direction[0]] !== undefined &&
          board[y][x] === 0 &&
          board[y + direction[0]][x + direction[1]] === 2 / turnColor &&
          board[y + direction[0] * i][x + direction[1] * i] !== 0 &&
          board[y + direction[0] * i][x + direction[1] * i] === turnColor
        ) {
          newBoard[y][x] = turnColor;
          newBoard[y + direction[0]*i][x + direction[1]*i] = turnColor;
          setTurnColor(2 / turnColor);
          setBoard(newBoard);
        } else {
          setTurnColor(2 / turnColor);
          setBoard(newBoard);
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
