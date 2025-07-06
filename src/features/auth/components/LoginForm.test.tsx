import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

const mockMutate = vi.fn();

vi.mock("../services/loginAuth", () => ({
  default: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mockMutate.mockClear();
  });

  const setup = () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  };

  it("renders login form elements", () => {
    setup();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "Mo1234/*");

    await userEvent.click(loginButton);

    expect(mockMutate).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "Mo1234/*",
    });
  });

  it("shows validation errors on empty submit", async () => {
    setup();
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.click(loginButton);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
