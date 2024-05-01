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
    const newBoard = structuredClone(board);
    if (newBoard[y][x] === 0) {
      for (const direction of directions) {
        for (let i = 1; i < 8; i++) {
          if (newBoard[y + direction[0] * i] === undefined) {
            break;
          } else {
            if (newBoard[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor) {
              continue;
            } else if (newBoard[y + direction[0] * i][x + direction[1] * i] === turnColor) {
              for (let j = i - 1; j > 0; j--) {
                newBoard[y + direction[0] * j][x + direction[1] * j] = turnColor;
                newBoard[y][x] = turnColor;
                setBoard(newBoard);
                setTurnColor(3 - turnColor);
              }
              break;
            } else {
              break;
            }
          }
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
                  style={{
                    background: color === 1 ? '#000' : '#fff',
                  }}
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
