import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  cleanup;
});

describe("test suite for App", () => {
  test("renders Click here to activate the growl", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const linkElement = getByText("Clik here to activate the growl");
    expect(linkElement).toBeInTheDocument();
  });

  test("does not renders a growl with class active on page load", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByText(/Hello World!/i)).toHaveClass("growl");
    expect(getByText(/Hello World!/i)).not.toHaveClass("growl active");
  });

  test("renders a growl with class active click on btn", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.click(getByText("Clik here to activate the growl"));
    expect(getByText(/Hello World!/i)).toHaveClass("growl active");
  });

  test("renders the growl for 3 secs by default", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(getByText("Clik here to activate the growl"));
    expect(getByText(/Hello World!/i)).toHaveClass("growl active");
    jest.advanceTimersByTime(4000);
    expect(getByText(/Hello World!/i)).not.toHaveClass("growl active");
  });

  test("renders growl for given time when timeout is provided", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App timeout={8} />
      </BrowserRouter>
    );
    fireEvent.click(getByText("Clik here to activate the growl"));
    expect(getByText(/Hello World!/i)).toHaveClass("growl active");
    jest.advanceTimersByTime(4000);
    expect(getByText(/Hello World!/i)).toHaveClass("growl active");
    jest.advanceTimersByTime(4000);
    expect(getByText(/Hello World!/i)).not.toHaveClass("growl active");
  });
});
