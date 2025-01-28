import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Cell } from "../Cell";
import { COLORS } from "../../utils/constants";
import { ColorOptions } from "../../types/types";

describe("Cell", () => {
  const handleClickPaint = jest.fn();
  const handleHoldPaint = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <Cell
        id="0-0"
        cell={null}
        handleClickPaint={handleClickPaint}
        handleHoldPaint={handleHoldPaint}
        isLeftClickHolded={false}
        currentColor={COLORS.magenta as ColorOptions}
      />
    );
    expect(screen.getByRole("gridcell")).toBeInTheDocument();
  });

  it("should call handleClickPaint when clicked", async () => {
    render(
      <Cell
        id="0-0"
        cell={null}
        handleClickPaint={handleClickPaint}
        handleHoldPaint={handleHoldPaint}
        isLeftClickHolded={false}
        currentColor={COLORS.magenta as ColorOptions}
      />
    );

    await userEvent.click(screen.getByRole("gridcell"));

    expect(handleClickPaint).toHaveBeenCalledTimes(1);
  });

  it("should call handleHoldPaint when left click is holded and the mouse is over the cell", async () => {
    render(
      <Cell
        id="0-0"
        cell={null}
        handleClickPaint={handleClickPaint}
        handleHoldPaint={handleHoldPaint}
        isLeftClickHolded={true}
        currentColor={COLORS.magenta as ColorOptions}
      />
    );

    const cell = screen.getByRole("gridcell", { name: "cell 0-0" });
    await userEvent.hover(cell);

    expect(handleHoldPaint).toHaveBeenCalledTimes(1);
  });
});
