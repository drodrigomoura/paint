import { render, screen } from "@testing-library/react";
import { ColorContextMenu } from "../ColorContextMenu";
import { COLORS } from "../../utils/constants";
import userEvent from "@testing-library/user-event";
describe("ColorContextMenu", () => {
  const handleRadioChange = jest.fn();
  const currentColor = COLORS.magenta;
  const setIsContextMenuVisible = jest.fn();

  it("should call the method to update the current color when a new color is selected", async () => {
    render(
      <ColorContextMenu
        handleRadioChange={handleRadioChange}
        currentColor={currentColor}
        isContextMenuVisible={true}
        setIsContextMenuVisible={setIsContextMenuVisible}
      />
    );

    const colorOption = screen.getByRole("radio", {
      name: /color option salmon/i,
    });

    await userEvent.click(colorOption);

    expect(handleRadioChange).toHaveBeenCalledTimes(1);
    expect(handleRadioChange).toHaveBeenCalledWith(COLORS.salmon);
  });
});
