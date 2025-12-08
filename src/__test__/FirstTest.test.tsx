import { render, screen } from "@testing-library/react";
import App from "../App";

describe("First tests", () => {
  test("h1 Vite + Reactの表示確認", () => {
    render(<App />);
    expect(true).toBeTruthy();

    const heading = screen.getByRole("heading", { name: "Vite + React" });
    expect(heading).toHaveTextContent("Vite + React");
    expect(heading).toBeInTheDocument();
  });
});
