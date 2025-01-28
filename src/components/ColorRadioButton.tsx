import { ChangeEventHandler } from "react";
import { ColorOptions } from "../types/types";
import { COLOR_NAMES } from "../utils/constants";

type ColorRadioButtonProps = {
  bgColor: ColorOptions;
  handleRadioChange: ChangeEventHandler<HTMLInputElement>;
  currentColor: ColorOptions;
};

export const ColorRadioButton = ({
  bgColor,
  handleRadioChange,
  currentColor,
}: ColorRadioButtonProps) => {
  const isSelected = currentColor === bgColor;

  return (
    <label
      style={{
        backgroundColor: bgColor,
        border: isSelected ? "2px solid black" : "",
      }}
      aria-label={`color option ${COLOR_NAMES[bgColor]}`}
    >
      <input
        type="radio"
        name="color"
        onChange={handleRadioChange}
        value={bgColor}
        checked={isSelected}
        tabIndex={0}
        aria-checked={isSelected}
      />
    </label>
  );
};
