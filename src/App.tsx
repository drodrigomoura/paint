import { useState } from "react";
import "./App.css";

import { BOARD_COLS, BOARD_ROWS, COLORS } from "./utils/constants";
import { ColorContextMenu } from "./components/ColorContextMenu";
import { Cell } from "./components/Cell";
import { ColorOptions, Nullable } from "./types/types";
import { useHold } from "./hooks/useHold";

type AppProps = {
  rows?: number;
  cols?: number;
};

function App({ rows = BOARD_ROWS, cols = BOARD_COLS }: AppProps) {
  const [board, setBoard] = useState<Nullable<string>[][]>(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );
  const [currentColor, setCurrentColor] = useState<ColorOptions>(
    COLORS.magenta as ColorOptions
  );
  const [isContextMenuVisible, setIsContextMenuVisible] =
    useState<boolean>(false);
  const [isLeftClickHolded] = useHold();

  const handleClickPaint = (rowIdx: number, colIdx: number) => {
    const newBoard = board.slice();

    setIsContextMenuVisible(false);

    if (!newBoard[rowIdx][colIdx]) {
      newBoard[rowIdx][colIdx] = currentColor;
    } else {
      newBoard[rowIdx][colIdx] = null;
    }

    setBoard(newBoard);
  };

  const handleHoldPaint = (rowIdx: number, colIdx: number) => {
    const newBoard = board.slice();

    newBoard[rowIdx][colIdx] = currentColor;

    setBoard(newBoard);
  };

  const handleRadioChange = (color: ColorOptions) => setCurrentColor(color);

  return (
    <div className="app">
      <div className="board">
        {board.map((row: Nullable<string>[], rowIdx: number) =>
          row.map((cell: Nullable<string>, colIdx: number) => {
            const id = `${rowIdx}-${colIdx}`;

            return (
              <Cell
                key={id}
                id={id}
                currentColor={currentColor}
                handleClickPaint={() => handleClickPaint(rowIdx, colIdx)}
                handleHoldPaint={() => handleHoldPaint(rowIdx, colIdx)}
                cell={cell}
                isLeftClickHolded={isLeftClickHolded}
              />
            );
          })
        )}
      </div>

      <ColorContextMenu
        isContextMenuVisible={isContextMenuVisible}
        setIsContextMenuVisible={setIsContextMenuVisible}
        currentColor={currentColor}
        handleRadioChange={handleRadioChange}
      />
    </div>
  );
}

export default App;
