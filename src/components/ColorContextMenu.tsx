import { ChangeEvent, Dispatch, memo, SetStateAction } from "react";

import { COLOR_OPTIONS } from "../utils/constants";
import { useContextMenu } from "../hooks/useContextMenu";
import { ColorOptions } from "../types/types";
import { ColorRadioButton } from "./ColorRadioButton";

type ColorContextMenuComponentProps = {
  handleRadioChange: (color: ColorOptions) => void;
  currentColor: ColorOptions;
  isContextMenuVisible: boolean;
  setIsContextMenuVisible: Dispatch<SetStateAction<boolean>>;
};

const ColorContextMenuComponent = ({
  handleRadioChange,
  currentColor,
  isContextMenuVisible,
  setIsContextMenuVisible,
}: ColorContextMenuComponentProps) => {
  const { contextMenuPosition, contextMenuRef } = useContextMenu({
    setIsContextMenuVisible,
  });

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setIsContextMenuVisible(false);
    handleRadioChange(e.target.value as ColorOptions);
  };

  return (
    <div
      role="menu"
      className={`context_menu ${isContextMenuVisible ? "context_menu--showed" : ""}`}
      tabIndex={-1}
      aria-hidden={!isContextMenuVisible}
      style={{
        top: contextMenuPosition.y,
        left: contextMenuPosition.x,
      }}
      ref={contextMenuRef}
      onMouseLeave={() => setIsContextMenuVisible(false)}
    >
      {COLOR_OPTIONS.map((option, idx) => (
        <ColorRadioButton
          key={idx}
          bgColor={option}
          handleRadioChange={handleSelect}
          currentColor={currentColor}
        />
      ))}
    </div>
  );
};

export const ColorContextMenu = memo(
  ColorContextMenuComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.isContextMenuVisible === nextProps.isContextMenuVisible &&
      prevProps.currentColor === nextProps.currentColor
    );
  }
);
