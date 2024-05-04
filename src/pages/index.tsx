import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const turnText = turnColor === 1 ? '黒' : '白';
  const blackCount = board.flat().filter((color) => color === 1).length; //boardをコピーしてfilterメソッドでcolorが1のものを抽出し、lengthで数えている
  const whiteCount = board.flat().filter((color) => color === 2).length;

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
          if (
            y + direction[0] * i < 0 ||
            y + direction[0] * i >= 8 ||
            x + direction[1] * i < 0 ||
            x + direction[1] * i >= 8
          ) {
            break;
          } else {
            if (board[y + direction[0]][x + direction[1]] === 0) {
              break;
            } else if (board[y + direction[0]][x + direction[1]] === turnColor) {
              break;
            } else if (board[y + direction[0]][x + direction[1]] === 3 - turnColor) {
              if (board[y + direction[0] * i][x + direction[1] * i] === 0) {
                break;
              } else if (board[y + direction[0] * i][x + direction[1] * i] === turnColor) {
                for (let j = i; j >= 0; j--) {
                  newBoard[y + direction[0] * j][x + direction[1] * j] = turnColor;
                }
              }
            }
          }
        }
        setBoard(newBoard);
        setTurnColor(3 - turnColor);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.scoreboard}>
        <div className={styles.turn}>ターン: {turnText}</div>
        <div className={styles.score}>
          黒の石: {blackCount} | 白の石: {whiteCount}
        </div>
      </div>
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
