import React from "react";
import { Nullable } from "../types/types";

type CellProps = {
  handleClickPaint: () => void;
  handleHoldPaint: () => void;
  cell: Nullable<string>;
  isLeftClickHolded: boolean;
  currentColor: string;
  id: string;
};

const CellComponent = ({
  cell,
  handleClickPaint,
  handleHoldPaint,
  isLeftClickHolded,
  currentColor,
  id,
}: CellProps) => {
  const handleClick = () => handleClickPaint();

  const handleMouseEnter = () => {
    if (isLeftClickHolded && cell !== currentColor) {
      handleHoldPaint();
    }
  };

  return (
    <button
      role="gridcell"
      aria-label={`cell ${id}`}
      className={`cell ${isLeftClickHolded ? "mouse--holded" : ""}`}
      style={{
        backgroundColor: cell || "transparent",
        width: "100%",
        height: "100%",
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    />
  );
};

export const Cell = React.memo(CellComponent, (prevProps, nextProps) => {
  return (
    prevProps.cell === nextProps.cell &&
    prevProps.isLeftClickHolded === nextProps.isLeftClickHolded &&
    prevProps.currentColor === nextProps.currentColor
  );
});
