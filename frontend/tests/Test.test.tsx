import Test from "@components/Test";

import { render, screen } from "@tests/utils/testUtils";

test("Renders Test component with input", () => {
  render(<Test input="TripFlow" />);
  expect(screen.getByText("TripFlow")).toBeInTheDocument();
});
