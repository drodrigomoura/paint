import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
describe("App", () => {
  const rows = 10;
  const cols = 10;

  it("should render correctly", () => {
    render(<App rows={rows} cols={cols} />);

    const cells = screen.getAllByRole("gridcell");

    expect(cells).toHaveLength(rows * cols);
  });

  it("should not display the context menu", () => {
    render(<App rows={rows} cols={cols} />);

    const contextMenu = screen.queryByRole("menu");

    expect(contextMenu).not.toBeInTheDocument();
  });

  it("should display the context menu when right-clicked", async () => {
    render(<App rows={rows} cols={cols} />);

    await userEvent.pointer({ keys: "[MouseRight>]" });

    const contextMenu = screen.getByRole("menu");

    expect(contextMenu).toBeInTheDocument();
  });
});
