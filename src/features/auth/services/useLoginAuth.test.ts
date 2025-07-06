/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, vi, expect, beforeEach } from "vitest";

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();
const mockMutateFn = vi.fn();

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// 5. Mock usePostMutation
vi.mock("../../../app/api/usePostMutation", () => ({
  usePostMutation: (_url: string, options: Record<string, unknown>) => {
    return {
      mutate: mockMutateFn,

      onSuccess: options.onSuccess,
      onError: options.onError,
    };
  },
}));

vi.mock("../authSlice", () => ({
  loginSuccess: vi.fn((payload) => ({
    type: "LOGIN_SUCCESS",
    payload,
  })),
}));

import toast from "react-hot-toast";
import useLoginAuth from "./loginAuth";

describe("useLoginAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle successful login for superAdmin", () => {
    const { onSuccess } = useLoginAuth() as any;

    const responseData = {
      accessToken: "token123",
      accessTokenExpires: "2030-01-01T00:00:00Z",
      data: {
        role: "superAdmin",
      },
    };

    onSuccess(responseData);

    expect(toast.success).toHaveBeenCalledWith(
      "Login Success",
      expect.anything()
    );
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "LOGIN_SUCCESS",
      payload: {
        role: "superAdmin",
        accessToken: "token123",
        accessTokenExpires: "2030-01-01T00:00:00Z",
      },
    });
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  it("should handle successful login for driver", () => {
    const { onSuccess } = useLoginAuth() as any;

    onSuccess({
      accessToken: "driver-token",
      accessTokenExpires: "2030-01-01T00:00:00Z",
      data: {
        role: "driver",
      },
    });

    expect(mockNavigate).toHaveBeenCalledWith("/driver");
  });

  it("should handle failed login", () => {
    const { onError } = useLoginAuth() as any;

    const error = {
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    };

    onError(error);

    expect(toast.error).toHaveBeenCalledWith(
      "Invalid credentials",
      expect.anything()
    );
  });

  it("should show fallback error if message is missing", () => {
    const { onError } = useLoginAuth() as any;

    const error = {
      response: {},
    };

    onError(error);

    expect(toast.error).toHaveBeenCalledWith(
      "Something went wrong",
      expect.anything()
    );
  });
});
