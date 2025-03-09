import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Payment from "../Payment"; // Adjust path if needed

test("navigates to home when Home button is clicked", () => {
  const mockNavigate = jest.fn(); // Mock useNavigate function

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

  render(
    <MemoryRouter>
      <Payment />
    </MemoryRouter>
  );

  // Find the "Go to Home" button
  const homeButton = screen.getByText(/Go to Home/i);
  
  // Simulate a click event
  userEvent.click(homeButton);

  // Expect the navigate function to be called with "/"
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
