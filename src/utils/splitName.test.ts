import { describe, it, expect } from "vitest";
import splitName from "./SplitName";

describe("splitName", () => {
  it("returns initials from two names", () => {
    expect(splitName("Mohamed Elsayed")).toBe("ME");
  });

  it("returns single initial from one name", () => {
    expect(splitName("Ahmed")).toBe("A");
  });

  it("ignores extra spaces", () => {
    expect(splitName("   Ali   Hassan   ")).toBe("AH");
  });

  it("returns empty string for empty input", () => {
    expect(splitName("")).toBe("");
  });

  it("returns empty string for only spaces", () => {
    expect(splitName("     ")).toBe("");
  });

  it("handles more than two names by using only the first two", () => {
    expect(splitName("Omar Ahmed Mahmoud")).toBe("OA");
  });
});
