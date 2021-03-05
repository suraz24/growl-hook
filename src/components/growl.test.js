import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Growl } from "./growl";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  cleanup;
});

describe("test suite for Growl", () => {
  test("displays message when active ", () => {
    const { getByText } = render(<Growl message="Hello" active={true} />);
    const helloText = getByText("Hello");
    expect(helloText).toBeInTheDocument();
  });

  test("when active is false, class in growl", () => {
    const { getByText } = render(<Growl message="Hello" active={false} />);
    expect(getByText(/Hello/i)).toHaveClass("growl");
    expect(getByText(/Hello/i)).not.toHaveClass("growl active");
  });

  test("when active is true, class in growl active", () => {
    const { getByText } = render(<Growl message="Hello" active={true} />);
    expect(getByText(/Hello/i)).toHaveClass("growl active");
  });
});
