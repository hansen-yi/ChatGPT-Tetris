import React, { useState, useEffect } from 'react';
import './Tetris.css';

const Tetris = () => {
  const manualGrid = Array.from({ length: 20 }, () => Array(10).fill(0))
  // manualGrid[12] = [8, 8, 0, 0, 0, 0, 0, 0, 0, 0];
  // manualGrid[13] = [8, 8, 8, 0, 0, 0, 0, 0, 0, 0];
  // manualGrid[14] = [8, 8, 8, 0, 0, 0, 0, 0, 0, 0];
  // manualGrid[15] = [8, 8, 8, 8, 0, 0, 0, 0, 0, 0];
  // manualGrid[16] = [8, 8, 8, 8, 0, 0, 0, 0, 0, 0];
  // manualGrid[17] = [8, 8, 8, 8, 8, 0, 0, 0, 0, 0];
  // manualGrid[18] = [8, 8, 8, 8, 8, 0, 0, 0, 0, 0];
  // manualGrid[19] = [8, 8, 8, 8, 8, 8, 0, 0, 0, 0];

  // manualGrid[12] = [0, 0, 0, 0, 8, 8, 8, 8, 8, 8];
  // manualGrid[13] = [0, 0, 0, 0, 0, 8, 8, 8, 8, 8];
  // manualGrid[14] = [0, 0, 0, 0, 0, 8, 8, 8, 8, 8];
  // manualGrid[15] = [0, 0, 0, 0, 0, 0, 8, 8, 8, 8];
  // manualGrid[16] = [0, 0, 0, 0, 0, 8, 8, 8, 8, 8];
  // manualGrid[17] = [0, 0, 0, 8, 8, 8, 8, 8, 8, 8];
  // manualGrid[18] = [0, 0, 8, 8, 8, 8, 8, 8, 8, 8];
  // manualGrid[19] = [0, 0, 8, 8, 8, 8, 8, 8, 8, 8];

  // const [grid, setGrid] = useState(Array.from({ length: 20 }, () => Array(10).fill(0)));
  const [grid, setGrid] = useState(manualGrid);
  const [currentPiece, setCurrentPiece] = useState([
    [1, 1],
    [1, 1]
  ]);
  const [currentPos, setCurrentPos] = useState({ x: 4, y: 0 });

  const [currPieceType, setCurrPieceType] = useState(1);

  const [clearRowSound] = useState(() => {
    const audio = new Audio('/clear.mp3');
    audio.volume = 0.25; // Adjust volume here (0.0 to 1.0)
    return audio;
  });

  const [setPieceSound] = useState(() => {
    const audio = new Audio('/set.mp3');
    audio.volume = 0.5; // Adjust volume here (0.0 to 1.0)
    return audio;
  });

  const [audioStarted, setAudioStarted] = useState(false);
  const [backgroundMusic] = useState(() => {
    const audio = new Audio('/background-music.wav');
    audio.volume = 0.2;
    audio.loop = true;
    return audio;
  });

  // const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // if (!gameOver) {
      const timer = setInterval(() => {
        moveDown();
      }, 500);
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    // }
  });

  const handleKeyDown = (event) => {
    // console.log('Key pressed:', event.keyCode);
    if (!audioStarted) {
      backgroundMusic.play();
      setAudioStarted(true);
    }
    switch (event.keyCode) {
      case 37: // Left arrow key
        moveLeft();
        break;
      case 39: // Right arrow key
        moveRight();
        break;
      case 38: // Up arrow key
        rotatePiece();
        break;
      case 40: // Down arrow key
        moveDown();
        break;
      case 32: // Space key
        drop();
        break;
      default:
        break;
    }
  };  

  const pieceTypeMap = {
    '[[1,1],[1,1]]' : 1,
    '[[1,1,1,1]]' : 2,
    '[[1,1,0],[0,1,1]]' : 3,
    '[[0,1,0],[1,1,1]]' : 4,
    '[[0,1,1],[1,1,0]]' : 5,
    '[[1,0,0],[1,1,1]]' : 6,
    '[[0,0,1],[1,1,1]]' : 7,
  };

  const moveDown = (distance = 1) => {
    const newPosY = currentPos.y + distance;
    if (isValidMove(currentPiece, currentPos.x, newPosY)) {
      clearPreviousPosition(currentPiece, currentPos); // Clear previous position
      setCurrentPos({ ...currentPos, y: newPosY });
      mergePiece(currentPiece, { ...currentPos, y: newPosY });
    } else {
      mergePiece(currentPiece, currentPos);
      setPieceSound.play();
      checkRows();
      setCurrentPiece(generateRandomPiece());
      // setCurrPieceType(pieceTypeMap[JSON.stringify(currentPiece)]);
      setCurrentPos({ x: 4, y: 0 });
    }
  };

  const checkRows = () => {
    const updatedGrid = [...grid];
    let rowsCleared = 0;
    for (let row = 0; row < grid.length; row++) {
      if (grid[row].every(cell => cell !== 0)) {
        updatedGrid.splice(row, 1);
        updatedGrid.unshift(Array(10).fill(0));
        rowsCleared++;
      }
    }
    if (rowsCleared > 0) {
      // Update score or perform any other necessary actions
      console.log(`${rowsCleared} row(s) cleared!`);
      clearRowSound.play();
    }
    setGrid(updatedGrid);
  };
  

  const moveLeft = () => {
    const newPos = { x: currentPos.x - 1, y: currentPos.y };
    if (isValidMove(currentPiece, newPos.x, newPos.y)) {
      clearPreviousPosition(currentPiece, currentPos); // Clear previous position
      setCurrentPos(newPos);
      mergePiece(currentPiece, newPos);
    }
  };

  const moveRight = () => {
    const newPos = { x: currentPos.x + 1, y: currentPos.y };
    if (isValidMove(currentPiece, newPos.x, newPos.y)) {
      clearPreviousPosition(currentPiece, currentPos); // Clear previous position
      setCurrentPos(newPos);
      mergePiece(currentPiece, newPos);
    }
  };

  const rotatePiece = () => {
    const rotatedPiece = rotate(currentPiece);
    if (isValidMove(rotatedPiece, currentPos.x, currentPos.y)) {
      clearPreviousPosition(currentPiece, currentPos); // Clear previous position
      setCurrentPiece(rotatedPiece);
      mergePiece(rotatedPiece, currentPos);
    }
  };

  const drop = () => {
    let distance = 1;
    while (isValidMove(currentPiece, currentPos.x, currentPos.y + distance)) {
      distance++;
    }
    moveDown(distance - 1);
    setPieceSound.play();
    checkRows();
    setCurrentPiece(generateRandomPiece());
    // setCurrPieceType(pieceTypeMap[JSON.stringify(currentPiece)]);
    setCurrentPos({ x: 4, y: 0 });
  };
  

  const isValidMove = (piece, newX, newY) => {
    return piece.every((row, rowIndex) => {
      return row.every((cell, cellIndex) => {
        const y = newY + rowIndex;
        const x = newX + cellIndex;
        // Check if cell is within grid bounds and not occupied by existing pieces other than the moving piece
        return (
          (cell === 0 || (grid[y] && grid[y][x] === 0) || (cell !== 0 && isOccupiedByCurrentPiece(x, y))) &&
          x >= 0 &&
          x < 10 &&
          y < 20
        );
      });
    });
  };
  
  const isOccupiedByCurrentPiece = (x, y) => {
    return currentPiece.some((row, rowIndex) => {
      return row.some((cell, cellIndex) => {
        return cell !== 0 && currentPos.x + cellIndex === x && currentPos.y + rowIndex === y;
      });
    });
  };  

  const rotate = (piece) => {
    const rotatedPiece = piece[0].map((_, colIndex) =>
      piece.map((row) => row[colIndex]).reverse()
    );
    return rotatedPiece;
  };

  const mergePiece = (piece, pos) => {
    // const pieceType = pieceTypeMap[JSON.stringify(currentPiece)];
    // console.log(JSON.stringify(currentPiece));
    const updatedGrid = [...grid];
    piece.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const y = pos.y + rowIndex;
        const x = pos.x + cellIndex;
        if (cell === 1) {
          updatedGrid[y][x] = currPieceType;
        }
      });
    });
    setGrid(updatedGrid);
  };

  const generateRandomPiece = () => {
    const shapes = [
      [[1, 1], [1, 1]],
      [[1, 1, 1, 1]],
      [[1, 1, 0], [0, 1, 1]],
      [[0, 1, 0], [1, 1, 1]],
      [[0, 1, 1], [1, 1, 0]],
      [[1, 0, 0], [1, 1, 1]],
      [[0, 0, 1], [1, 1, 1]]
    ];
    const randomIndex = Math.floor(Math.random() * shapes.length);
    setCurrPieceType(pieceTypeMap[JSON.stringify(shapes[randomIndex])]);
    return shapes[randomIndex];
  };

  const clearPreviousPosition = (piece, pos) => {
    const updatedGrid = [...grid];
    piece.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const y = pos.y + rowIndex;
        const x = pos.x + cellIndex;
        if (cell === 1) {
          updatedGrid[y][x] = 0;
        }
      });
    });
    setGrid(updatedGrid);
  };

  // const restartGame = () => {
  //   setCurrentPiece(generateRandomPiece());
  //   setCurrentPos({ x: 4, y: 0 });
  //   setGameOver(false);
  //   setGrid(Array.from({ length: 20 }, () => Array(10).fill(0)));
  // };

  // useEffect(() => {
  //   if (gameOver) {
  //     alert('Game over! Press OK to restart.');
  //     restartGame();
  //   }
  // }, [gameOver, restartGame]);

  // useEffect(() => {
  //   if (currentPiece && !isValidMove(currentPiece, currentPos.x, currentPos.y)) {
  //     setGameOver(true);
  //   }
  // }, [currentPiece, currentPos, isValidMove]);

  return (
    <div className="tetris">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                className={`cell ${cell !== 0 ? `filled piece${cell}` : 'empty'}`}
                key={cellIndex}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tetris;
