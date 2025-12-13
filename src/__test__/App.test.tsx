import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "@/components/ui/provider";
import { mockMatchMedia } from "../../test/utils/mockMatchMedia";

beforeAll(() => {
  mockMatchMedia();
});

describe("First tests", () => {
  test("button Click me", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    const heading = screen.getByRole("heading", { name: "myBlog" });
    expect(heading).toBeInTheDocument();
  });
});
